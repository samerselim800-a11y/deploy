import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePinnedStackScroll(sectionRef, slideCount) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || slideCount < 2) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray("[data-stack-panel]");

      // Set initial states
      gsap.set(panels, {
        position: "absolute",
        inset: 0,
        autoAlpha: 1,
        force3D: true,
        transformOrigin: "50% 100%",
      });
      gsap.set(panels.slice(1), { yPercent: 100, scale: 0.96 });
      gsap.set(panels[0], { yPercent: 0, scale: 1 });
      gsap.set(panels, (i) => ({ zIndex: i + 1 }));

      if (reduceMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(slideCount - 1) * window.innerHeight}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          snap: {
            snapTo: 1 / (slideCount - 1),
            duration: { min: 0.2, max: 0.38 },
            delay: 0,
            ease: "power2.inOut",
            inertia: false,
            directional: false,
          },
        },
      });

      for (let i = 0; i < slideCount - 1; i++) {
        const current = panels[i];
        const next = panels[i + 1];
        const at = i;

        timeline
          .to(
            current,
            {
              yPercent: -6,
              scale: 0.88,
              autoAlpha: 0.3,
              filter: "blur(8px)",
              duration: 1,
            },
            at
          )
          .fromTo(
            next,
            { yPercent: 100, scale: 0.96, filter: "blur(6px)" },
            { yPercent: 0, scale: 1, filter: "blur(0px)", duration: 1 },
            at
          );
      }
    }, section);

    return () => ctx.revert();
  }, [sectionRef, slideCount]);
}
