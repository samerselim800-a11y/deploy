import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapScrollStory(sectionRef, slideCount) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || slideCount < 2) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray("[data-story-panel]");
      const backgrounds = gsap.utils.toArray("[data-story-bg]");
      const visuals = gsap.utils.toArray("[data-story-visual]");
      const depthItems = gsap.utils.toArray("[data-depth]");
      const progress = section.querySelector("[data-story-progress]");

      gsap.set(panels, { autoAlpha: 0, y: 70, filter: "blur(16px)" });
      gsap.set(visuals, {
        autoAlpha: 0,
        yPercent: 14,
        scale: 0.86,
        rotate: -7,
        transformOrigin: "50% 50%",
      });
      gsap.set(backgrounds, { autoAlpha: 0, scale: 1.12 });
      gsap.set([panels[0], visuals[0], backgrounds[0]], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
      });

      if (reduceMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(slideCount - 1, 1) * window.innerHeight * 1.25}`,
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      depthItems.forEach((item) => {
        const depth = Number(item.dataset.depth || 1);
        timeline.to(item, { yPercent: -10 * depth, rotate: depth * 1.5 }, 0);
      });

      for (let index = 0; index < slideCount - 1; index += 1) {
        const at = index + 0.08;
        timeline
          .to(panels[index], { autoAlpha: 0, y: -72, filter: "blur(16px)", duration: 0.62 }, at)
          .to(
            visuals[index],
            { autoAlpha: 0, yPercent: -13, xPercent: -5, scale: 0.82, rotate: 7, duration: 0.72 },
            at,
          )
          .to(backgrounds[index], { autoAlpha: 0, scale: 0.98, duration: 0.78 }, at)
          .fromTo(
            backgrounds[index + 1],
            { autoAlpha: 0, scale: 1.14 },
            { autoAlpha: 1, scale: 1.02, duration: 0.82 },
            at + 0.12,
          )
          .fromTo(
            panels[index + 1],
            { autoAlpha: 0, y: 84, filter: "blur(16px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.72 },
            at + 0.2,
          )
          .fromTo(
            visuals[index + 1],
            { autoAlpha: 0, yPercent: 16, xPercent: 8, scale: 0.84, rotate: -8 },
            { autoAlpha: 1, yPercent: 0, xPercent: 0, scale: 1, rotate: 0, duration: 0.8 },
            at + 0.16,
          );
      }

      timeline.to(progress, { scaleX: 1, duration: slideCount - 1 }, 0);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [sectionRef, slideCount]);
}
