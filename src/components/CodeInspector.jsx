'use client';
import { useState } from 'react';

const SNIPPETS = [
  {
    id: 'cuda',
    label: 'FlashAttention CUDA',
    path: 'src/kernels/flash_attention.cu',
    language: 'CUDA C++',
    signature: '__global__ void flash_attn_v2_kernel(const float* __restrict__ Q, const float* K, float* O, int N, int d)',
    code: `// Tiling & Shared Memory Softmax Accumulation
__shared__ float s_Q[TILE_SIZE][HEAD_DIM];
__shared__ float s_K[TILE_SIZE][HEAD_DIM];
float m_i = -INFINITY, l_i = 0.0f;
#pragma unroll
for (int j = 0; j < num_blocks; ++j) {
    // Online softmax online rescale
    float s_ij = dot(s_Q[tx], s_K[ty]) * sm_scale;
    float m_new = fmaxf(m_i, s_ij);
    l_i = l_i * expf(m_i - m_new) + expf(s_ij - m_new);
}`,
    benchmark: 'Latency: 1.12ms · Throughput: 142 TFLOPS · Precision: FP16'
  },
  {
    id: 'pytorch',
    label: 'Contrastive Loss PyTorch',
    path: 'models/embeddings/contrastive_loss.py',
    language: 'Python',
    signature: 'class InfoNCELoss(nn.Module): forward(self, query, key, negatives)',
    code: `# Temperature-scaled cosine similarity logits
query = F.normalize(query, dim=-1)
key = F.normalize(key, dim=-1)
pos_sim = torch.sum(query * key, dim=-1, keepdim=True) # [B, 1]
neg_sim = torch.matmul(query, negatives.transpose(-1, -2)) # [B, N]
logits = torch.cat([pos_sim, neg_sim], dim=-1) / self.temperature
labels = torch.zeros(B, dtype=torch.long, device=query.device)
return F.cross_entropy(logits, labels)`,
    benchmark: 'Embedding Dimension: 1536d · Batch Size: 4096 · Loss: 0.142'
  },
  {
    id: 'c_redis',
    label: 'Epoll Event Loop C',
    path: 'src/events/ae_epoll.c',
    language: 'C',
    signature: 'static int aeApiPoll(aeEventLoop *eventLoop, struct timeval *tvp)',
    code: `struct epoll_event events[AE_SETSIZE];
int numevents = epoll_wait(state->epfd, events, eventLoop->setsize, timeout);
if (numevents > 0) {
    for (int j = 0; j < numevents; j++) {
        int mask = 0;
        struct epoll_event *e = events + j;
        if (e->events & EPOLLIN) mask |= AE_READABLE;
        if (e->events & EPOLLOUT) mask |= AE_WRITABLE;
        aeProcessEvents(eventLoop, e->data.fd, mask);
    }
}`,
    benchmark: 'Non-blocking I/O · 95k req/sec · Memory Footprint: 1.2MB'
  }
];

export default function CodeInspector() {
  const [activeId, setActiveId] = useState('cuda');
  const activeSnippet = SNIPPETS.find((s) => s.id === activeId) || SNIPPETS[0];

  return (
    <div className="tech-flavor-box mono-text">
      {/* Code Tab Controls */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {SNIPPETS.map((snippet) => (
          <button
            key={snippet.id}
            onClick={() => setActiveId(snippet.id)}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              backgroundColor: activeId === snippet.id ? 'rgba(181, 97, 82, 0.12)' : 'transparent',
              color: activeId === snippet.id ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.72rem',
              transition: 'all 0.25s ease'
            }}
          >
            {snippet.label}
          </button>
        ))}
      </div>

      {/* Snippet Header Meta */}
      <div className="flavor-row">
        <span className="flavor-label">File:</span>
        <span className="flavor-value">{activeSnippet.path}</span>
      </div>
      <div className="flavor-row" style={{ marginBottom: '0.75rem' }}>
        <span className="flavor-label">Signature:</span>
        <span className="flavor-value" style={{ color: 'var(--accent-cream)' }}>
          {activeSnippet.signature}
        </span>
      </div>

      {/* Code Block Preview */}
      <div
        className="code-block-signature"
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: 1.5,
          color: 'var(--text-secondary)',
          backgroundColor: 'rgba(10, 10, 10, 0.5)',
          padding: '0.8rem',
          borderRadius: '4px',
          border: '1px solid var(--border)'
        }}
      >
        {activeSnippet.code}
      </div>

      {/* Benchmark Footnote */}
      <div className="flavor-row" style={{ marginTop: '0.75rem' }}>
        <span className="flavor-label">Benchmark:</span>
        <span className="flavor-value" style={{ color: 'var(--accent-teal)' }}>
          {activeSnippet.benchmark}
        </span>
      </div>
    </div>
  );
}
