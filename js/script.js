(() => {
  "use strict";

  /* ═══════════════════════════════════════
     UTILS
     ═══════════════════════════════════════ */
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const lerp = (a, b, n) => a + (b - a) * n;
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  /* ═══════════════════════════════════════
     SCROLL PROGRESS BAR
     ═══════════════════════════════════════ */
  const scrollProg = $("#scrollProgress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollProg.style.width = h > 0 ? (window.scrollY / h * 100) + "%" : "0%";
  }, { passive: true });

  /* ═══════════════════════════════════════
     NAV
     ═══════════════════════════════════════ */
  const nav = $("#nav"), burger = $("#navBurger"), navLinks = $("#navLinks");
  window.addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 60), { passive: true });
  burger?.addEventListener("click", () => {
    const o = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", o);
    burger.setAttribute("aria-expanded", String(o));
  });
  navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger?.classList.remove("is-open");
  }));

  /* smooth anchor */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const t = $(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  /* ═══════════════════════════════════════
     PARTICLE SYSTEM (Hero)
     ═══════════════════════════════════════ */
  const pCanvas = $("#heroParticles");
  if (pCanvas) {
    const ctx = pCanvas.getContext("2d");
    let W, H, particles = [], mouse = { x: -1000, y: -1000 };
    const resize = () => { W = pCanvas.width = pCanvas.offsetWidth; H = pCanvas.height = pCanvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    pCanvas.parentElement.addEventListener("mousemove", e => {
      const r = pCanvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? "232,184,74" : "42,166,158";
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
          this.alpha = Math.min(this.alpha + 0.02, 0.8);
        }
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    const particleCount = window.matchMedia("(max-width: 760px)").matches ? 28 : 52;
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232,184,74,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ═══════════════════════════════════════
     TYPING EFFECT
     ═══════════════════════════════════════ */
  const typingEl = $("#typingText");
  if (typingEl) {
    const text = "Trọng tâm: độc lập dân tộc phải thực chất, vì nhân dân; chủ nghĩa xã hội là mục tiêu chiến lược và điều kiện bảo đảm nền độc lập bền vững.";
    let i = 0;
    const type = () => {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(type, 30 + Math.random() * 30);
      }
    };
    setTimeout(type, 800);
  }

  /* ═══════════════════════════════════════
     MAGNETIC BUTTONS
     ═══════════════════════════════════════ */
  $$(".magnetic").forEach(btn => {
    const strength = parseInt(btn.dataset.strength || "15", 10);
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * strength / r.width}px, ${y * strength / r.height}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  /* ═══════════════════════════════════════
     HERO COUNTER
     ═══════════════════════════════════════ */
  let countersDone = false;
  function animateCounters() {
    if (countersDone) return;
    countersDone = true;
    $$(".counter-num[data-target]").forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const dur = 1200, start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ═══════════════════════════════════════
     STAGGERED GROUPS
     ═══════════════════════════════════════ */
  [
    ".chapter-map",
    ".focus-grid",
    ".method-grid",
    ".soc-overview",
    ".principle-cards",
    ".condition-triangle",
    ".image-triptych",
    ".life-grid",
    ".horizontal-timeline",
    ".party-diagram",
    ".unity-diagram",
    ".compare-logic",
    ".character-grid",
    ".radial-section",
    ".premise-flow",
    ".sovereignty-grid"
  ].forEach(groupSelector => {
    $$(groupSelector).forEach(group => {
      Array.from(group.children).forEach((child, idx) => {
        if (child.classList.contains("anim") && !child.dataset.delay) {
          child.dataset.delay = String(idx * 90);
        }
      });
    });
  });

  /* ═══════════════════════════════════════
     INTERSECTION OBSERVER
     ═══════════════════════════════════════ */
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || "0", 10);
          setTimeout(() => entry.target.classList.add("is-visible"), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    $$(".anim").forEach(el => obs.observe(el));
  } else {
    $$(".anim").forEach(el => el.classList.add("is-visible"));
  }

  /* ═══════════════════════════════════════
     WORD REVEAL
     ═══════════════════════════════════════ */
  $$(".word-reveal").forEach(el => {
    const text = el.dataset.text || el.textContent;
    el.innerHTML = text.split(" ").map((w, i) =>
      `<span class="word" style="transition-delay:${i * 0.06}s">${w}</span>`
    ).join(" ");
  });

  const wordObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        wordObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  $$(".word-reveal").forEach(el => wordObs.observe(el));

  /* ═══════════════════════════════════════
     3D CAROUSEL
     ═══════════════════════════════════════ */
  const carousel = $("#carousel");
  const carouselItems = $$(".carousel-item");
  const dotsContainer = $("#carouselDots");
  let currentSlide = 0;
  const total = carouselItems.length;

  if (carousel && total > 0) {
    /* create dots */
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("div");
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    function goToSlide(idx) {
      currentSlide = idx;
      carouselItems.forEach((item, i) => {
        const offset = i - idx;
        const absOff = Math.abs(offset);
        let tx, tz, ry, sc, op;
        if (absOff === 0) {
          tx = 0; tz = 80; ry = 0; sc = 1; op = 1;
          item.classList.add("is-active");
        } else {
          const dir = offset > 0 ? 1 : -1;
          tx = dir * (180 + absOff * 46);
          tz = -absOff * 90;
          ry = dir * -10;
          sc = Math.max(0.72, 1 - absOff * 0.1);
          op = Math.max(0, 1 - absOff * 0.26);
          item.classList.remove("is-active");
        }
        item.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`;
        item.style.opacity = op;
        item.style.filter = absOff > 1 ? "blur(2px) saturate(0.8)" : "none";
        item.style.zIndex = total - absOff;
      });
      $$(".carousel-dot").forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }

    $("#carouselPrev")?.addEventListener("click", () => goToSlide((currentSlide - 1 + total) % total));
    $("#carouselNext")?.addEventListener("click", () => goToSlide((currentSlide + 1) % total));

    /* auto-rotate */
    let autoTimer = setInterval(() => goToSlide((currentSlide + 1) % total), 4000);
    carousel.addEventListener("mouseenter", () => clearInterval(autoTimer));
    carousel.addEventListener("mouseleave", () => {
      autoTimer = setInterval(() => goToSlide((currentSlide + 1) % total), 4000);
    });

    goToSlide(0);
  }

  /* ═══════════════════════════════════════
     FLIP CARDS
     ═══════════════════════════════════════ */
  $$(".flip-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
  });

  /* ═══════════════════════════════════════
     3D TILT CARDS
     ═══════════════════════════════════════ */
  $$(".tilt-card").forEach(card => {
    const shine = card.querySelector(".soc-card-shine");
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rotX = (0.5 - y) * 12;
      const rotY = (x - 0.5) * 12;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      if (shine) {
        shine.style.setProperty("--mx", (x * 100) + "%");
        shine.style.setProperty("--my", (y * 100) + "%");
      }
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ═══════════════════════════════════════
     CARD SPOTLIGHT
     ═══════════════════════════════════════ */
  $$(".map-card, .focus-card, .method-card, .soc-panel, .number-card, .compare-col, .timeline-card, .party-node, .orbit-card, .character-grid article").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  /* ═══════════════════════════════════════
     TIMELINE PROGRESS
     ═══════════════════════════════════════ */
  const timelineWrap = $(".timeline-wrap");
  const timelineProg = $("#timelineProgress");
  const tlItems = $$(".tl-item");
  if (timelineWrap && tlItems.length) {
    const tlObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const step = parseInt(entry.target.dataset.step, 10);
          entry.target.classList.add("is-active");
          const pct = (step / tlItems.length) * 100;
          if (timelineProg) timelineProg.style.setProperty("--progress", pct + "%");
        }
      });
    }, { threshold: 0.6 });
    tlItems.forEach(item => tlObs.observe(item));
  }

  /* ═══════════════════════════════════════
     COMPARE BARS ANIMATION
     ═══════════════════════════════════════ */
  const compareObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".compare-fill").forEach(fill => {
          setTimeout(() => { fill.style.width = fill.dataset.width + "%"; }, 300);
        });
        compareObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  $$(".compare-wrap").forEach(el => compareObs.observe(el));

  /* ═══════════════════════════════════════
     PARALLAX IMAGES
     ═══════════════════════════════════════ */
  let pTicking = false;
  window.addEventListener("scroll", () => {
    if (!pTicking) {
      requestAnimationFrame(() => {
        $$(".parallax-img img").forEach(img => {
          const rect = img.parentElement.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const speed = parseFloat(img.parentElement.dataset.speed || "0.2");
            const offset = (rect.top - window.innerHeight / 2) * speed;
            img.style.transform = `translateY(${offset}px) scale(1.1)`;
          }
        });
        /* hero img parallax */
        const heroImg = $("#heroImg");
        if (heroImg && scrollY < window.innerHeight) {
          heroImg.style.transform = `scale(1.1) translateY(${scrollY * 0.25}px)`;
        }
        pTicking = false;
      });
      pTicking = true;
    }
  }, { passive: true });

  /* ═══════════════════════════════════════
     QUIZ + CONFETTI
     ═══════════════════════════════════════ */
  const rvBtns = $$(".rv-btn");
  const totalQ = rvBtns.length;
  const ringFill = $("#ringFill");
  const scoreNum = $("#scoreNum");
  const circumference = 2 * Math.PI * 52; // r=52
  let done = 0;

  function updateScore() {
    done = $$(".rv-btn.is-done").length;
    if (scoreNum) scoreNum.textContent = done;
    if (ringFill) {
      const offset = circumference - (done / totalQ) * circumference;
      ringFill.style.strokeDashoffset = offset;
    }
    if (done === totalQ) launchConfetti();
  }

  rvBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-done")) {
        btn.classList.remove("is-done");
        btn.classList.remove("is-active");
      } else {
        btn.classList.add("is-done");
        btn.classList.add("is-active");
        /* mini pulse */
        btn.style.transform = "scale(1.06)";
        setTimeout(() => btn.style.transform = "", 300);
      }
      updateScore();
    });
  });

  /* ═══════════════════════════════════════
     CONFETTI
     ═══════════════════════════════════════ */
  function launchConfetti() {
    const canvas = $("#confettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["#e8b84a", "#c4261e", "#2aa69e", "#fff", "#f0d87a", "#ff6b6b"];
    const pieces = [];
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.2,
        life: 1,
      });
    }
    let running = true;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rot += p.rotV;
        p.life -= 0.003;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive && running) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
    setTimeout(() => { running = false; }, 5000);
  }

  /* ═══════════════════════════════════════
     HERO LOADED STATE
     ═══════════════════════════════════════ */
  setTimeout(() => {
    $(".hero")?.classList.add("is-loaded");
    animateCounters();
  }, 300);

  /* ═══════════════════════════════════════
     ACTIVE NAV HIGHLIGHT
     ═══════════════════════════════════════ */
  const navSections = [];
  navLinks?.querySelectorAll("a").forEach(link => {
    const sec = $(link.getAttribute("href"));
    if (sec) navSections.push({ link, sec });
  });
  window.addEventListener("scroll", () => {
    const pos = scrollY + 200;
    let current = null;
    navSections.forEach(({ link, sec }) => { if (sec.offsetTop <= pos) current = link; });
    navLinks?.querySelectorAll("a").forEach(a => { a.style.color = ""; a.style.background = ""; });
    if (current) { current.style.color = "#fff"; current.style.background = "rgba(255,255,255,0.08)"; }
  }, { passive: true });

})();
