"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    index: "01",
    title: "Tensorx.h",
    type: "Tensor infrastructure",
    description:
      "An N-dimensional tensor library in C. Manual allocation, multiple dtypes, contiguous strides, cloning, and the beginnings of CPU/CUDA backend work.",
    stack: ["C", "MEMORY", "STRIDES", "CUDA"],
    href: "https://github.com/Dhruvdesai793/Tensorx.h",
  },
  {
    index: "02",
    title: "CNN Papers",
    type: "Architecture lab",
    description:
      "Eight computer-vision architectures—from LeNet-5 to DeepLabv3+—implemented in PyTorch with ablations and single-GPU experiment notes.",
    stack: ["PYTORCH", "ABLATIONS", "RTX 5050", "VISION"],
    href: "https://github.com/Dhruvdesai793/cnn-papers-exp",
  },
  {
    index: "03",
    title: "U-Net / CamVid",
    type: "Semantic segmentation",
    description:
      "A custom U-Net and complete CamVid pipeline: augmentation, training, checkpointing, evaluation, inference, and qualitative results.",
    stack: ["PYTORCH", "U-NET", "CAMVID", "OPENCV"],
    href: "https://github.com/Dhruvdesai793/UNet-CamVid-Segmentation",
  },
  {
    index: "04",
    title: "Build Redis",
    type: "Systems study",
    description:
      "A Redis-compatible TCP server in TypeScript with RESP parsing, RDB loading, and the master–replica synchronization handshake.",
    stack: ["TYPESCRIPT", "TCP", "RESP", "REPLICATION"],
    href: "https://github.com/Dhruvdesai793/Build-Redis",
  },
];

const profiles = [
  ["GitHub", "https://github.com/Dhruvdesai793"],
  ["Kaggle", "https://www.kaggle.com/blixture"],
  ["LinkedIn", "https://www.linkedin.com/in/dhruv-desai-b0779b370/"],
  ["X / Twitter", "https://twitter.com/Noctravellian"],
];

export default function Portfolio() {
  const root = useRef(null);
  const panel = useRef(null);
  const peel = useRef(null);
  const [labOpen, setLabOpen] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set("[data-intro], [data-reveal]", { clearProps: "all" });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-nav]", { y: -16, autoAlpha: 0, duration: 0.65 })
        .from(
          "[data-intro]",
          {
            yPercent: 115,
            rotate: 1.5,
            duration: 1.05,
            stagger: 0.09,
          },
          "-=0.2",
        )
        .from(
          "[data-peel]",
          { xPercent: 100, autoAlpha: 0, duration: 0.7 },
          "-=0.55",
        )
        .from(
          "[data-photo]",
          { scale: 0.965, autoAlpha: 0, duration: 1.1 },
          "-=0.85",
        )
        .from(
          "[data-hero-meta]",
          { y: 12, autoAlpha: 0, duration: 0.6, stagger: 0.05 },
          "-=0.72",
        );

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 30,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLabOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(panel.current, { x: labOpen ? 0 : "100%" });
      return;
    }

    gsap.to(panel.current, {
      x: labOpen ? 0 : "100%",
      duration: labOpen ? 0.78 : 0.62,
      ease: "power4.inOut",
    });
    gsap.to("[data-main-shell]", {
      x: labOpen ? "-7vw" : 0,
      scale: labOpen ? 0.985 : 1,
      duration: 0.78,
      ease: "power4.inOut",
    });
    gsap.to(peel.current, {
      rotate: labOpen ? -3 : 0,
      x: labOpen ? -12 : 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [labOpen]);

  return (
    <div ref={root} className="site-shell">
      <div className="noise" aria-hidden="true" />

      <div data-main-shell className="main-shell" inert={labOpen}>
        <header data-nav className="site-header">
          <a className="wordmark" href="#top" aria-label="Dhruv Desai, home">
            DD<span> / 26</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#profile">Profile</a>
          </nav>
          <p>Deep Learning Engineer</p>
        </header>

        <main>
          <section id="top" className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="intro-clip">
                <p data-intro className="hero-role">Deep Learning Engineer</p>
              </div>
              <h1 id="hero-title">
                <span className="intro-clip"><span data-intro>Dhruv</span></span>
                <span className="intro-clip"><span data-intro>Desai</span></span>
              </h1>
              <div className="hero-details">
                <div className="intro-clip">
                  <p data-intro className="hero-tagline">I like burning GPUs.</p>
                </div>
                <div data-hero-meta className="hero-socials" aria-label="Social profiles">
                  {profiles.map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer">
                      {label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <figure data-photo className="hero-portrait">
              <div className="portrait-frame">
                <Image
                  src="/dhruv-profile.jpg"
                  alt="Stylized portrait of Dhruv Desai lit in blue and amber"
                  width={460}
                  height={460}
                  priority
                  sizes="(max-width: 760px) 100vw, 38vw"
                />
              </div>
              <figcaption>
                <span>Portrait / 01</span>
                <span>India · 2026</span>
              </figcaption>
            </figure>
          </section>

          <section id="work" className="work-section" aria-labelledby="work-title">
            <div data-reveal className="section-heading">
              <p className="eyebrow">Index / 04</p>
              <h2 id="work-title">Selected work</h2>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <a
                  data-reveal
                  className="project-row"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  key={project.title}
                >
                  <div className="project-index">{project.index}</div>
                  <div className="project-main">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <span>{project.type}</span>
                    </div>
                    <p>{project.description}</p>
                    <ul aria-label={`${project.title} technologies`}>
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="project-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section id="profile" className="profile-section" aria-labelledby="profile-title">
            <div data-reveal className="profile-label">
              <p className="eyebrow">Profile</p>
              <span>IND / GMT+5:30</span>
            </div>
            <div data-reveal className="profile-copy">
              <h2 id="profile-title">
                Deep learning first. Systems when the abstraction gets in the way.
              </h2>
              <div className="profile-meta">
                <p>Model internals</p>
                <p>Tensor runtimes</p>
                <p>Computer vision</p>
                <p>GPU performance</p>
              </div>
            </div>
          </section>
        </main>

        <footer data-reveal className="site-footer">
          <p>Dhruv Desai © 2026</p>
          <div className="profile-links">
            {profiles.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </footer>
      </div>

      <button
        ref={peel}
        data-peel
        className={`page-peel ${labOpen ? "is-open" : ""}`}
        type="button"
        onClick={() => setLabOpen((open) => !open)}
        aria-expanded={labOpen}
        aria-controls="off-hours"
      >
        <span>{labOpen ? "CLOSE" : "OFF HOURS"}</span>
        <span aria-hidden="true">{labOpen ? "×" : "↙"}</span>
      </button>

      <aside
        ref={panel}
        id="off-hours"
        className="off-hours"
        aria-hidden={!labOpen}
        aria-label="Off-hours projects"
      >
        <div className="lab-header">
          <p>Side B / Experiments</p>
          <span>Unnecessarily fun software</span>
        </div>
        <div className="lab-title">
          <p>After hours</p>
          <h2>Things that should probably run in a browser.</h2>
        </div>
        <div className="lab-list">
          <div>
            <span>01</span>
            <h3>DOOM, on this website</h3>
            <p>Incoming</p>
          </div>
          <div>
            <span>02</span>
            <h3>GPU experiments</h3>
            <p>Incoming</p>
          </div>
          <div>
            <span>03</span>
            <h3>Bad ideas, measured</h3>
            <p>Incoming</p>
          </div>
        </div>
        <p className="lab-footer">This side stays unfinished on purpose.</p>
      </aside>
    </div>
  );
}
