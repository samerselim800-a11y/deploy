import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePinnedStackScroll(sectionRef, slideCount) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || slideCount < 2) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray("[data-stack-panel]");
      const copies = gsap.utils.toArray("[data-stack-copy]");
      const visuals = gsap.utils.toArray("[data-stack-visual]");
      const depthItems = gsap.utils.toArray("[data-stack-depth]");
      const progress = section.querySelector("[data-stack-progress]");

      gsap.set(section, { "--stack-active": 0 });
      gsap.set(panels, {
        position: "absolute",
        inset: 0,
        autoAlpha: 1,
        force3D: true,
        transformOrigin: "50% 50%",
      });
      gsap.set(panels.slice(1), { yPercent: 100, scale: 0.94 });
      gsap.set(panels[0], { yPercent: 0, scale: 1 });
      gsap.set(panels, (index) => ({ zIndex: index + 1 }));
      gsap.set(copies, { y: 50, autoAlpha: 0, filter: "blur(14px)" });
      gsap.set(visuals, { y: 70, scale: 0.9, rotate: -5, autoAlpha: 0 });
      gsap.set([copies[0], visuals[0]], {
        y: 0,
        scale: 1,
        rotate: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
      });

      if (reduceMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(slideCount - 1) * window.innerHeight}`,
          pin: true,
          scrub: true,           // ✅ فوري بدون تأخير
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          snap: {
            snapTo: 1 / (slideCount - 1),
            duration: { min: 0.2, max: 0.4 },
            delay: 0,
            ease: "power2.inOut",
            inertia: false,      // ✅ يلغي الـ momentum
            directional: false,  // ✅ slide واحد في كل مرة
          },
          onUpdate: (self) => {
            section.style.setProperty("--stack-active", self.progress);
          },
        },
      });

      depthItems.forEach((item) => {
        const depth = Number(item.dataset.stackDepth || 1);
        timeline.to(item, { yPercent: -10 * depth, rotate: 2 * depth }, 0);
      });

      for (let index = 0; index < slideCount - 1; index += 1) {
        const current = panels[index];
        const next = panels[index + 1];
        const at = index;

        timeline
          .to(
            current,
            {
              yPercent: -34,
              scale: 0.84,
              rotateX: 5,
              autoAlpha: 0.28,
              filter: "blur(10px)",
              duration: 1,
            },
            at,
          )
          .fromTo(
            next,
            {
              yPercent: 100,
              scale: 0.94,
              rotateX: -7,
              autoAlpha: 1,
              filter: "blur(8px)",
            },
            {
              yPercent: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 1,
            },
            at,
          )
          .to(
            copies[index],
            { y: -70, autoAlpha: 0, filter: "blur(14px)", duration: 0.42 },
            at + 0.05,
          )
          .to(
            visuals[index],
            { y: -90, scale: 0.84, rotate: 7, autoAlpha: 0, duration: 0.5 },
            at + 0.03,
          )
          .fromTo(
            copies[index + 1],
            { y: 82, autoAlpha: 0, filter: "blur(14px)" },
            { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.48 },
            at + 0.5,
          )
          .fromTo(
            visuals[index + 1],
            { y: 96, scale: 0.88, rotate: -7, autoAlpha: 0 },
            { y: 0, scale: 1, rotate: 0, autoAlpha: 1, duration: 0.55 },
            at + 0.42,
          );
      }

      timeline.to(progress, { scaleX: 1, duration: slideCount - 1 }, 0);
    }, section);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, slideCount]);
}