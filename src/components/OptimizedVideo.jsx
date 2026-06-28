import { useEffect, useRef, useState } from "react";

export default function OptimizedVideo({
  webmSrc,
  mp4Src,
  className,
  poster,
  ariaLabel,
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible) setShouldLoad(true);
      },
      { rootMargin: "350px 0px", threshold: 0.12 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return undefined;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }

    return undefined;
  }, [isVisible, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={ariaLabel}
    >
      {shouldLoad && mp4Src && <source src={mp4Src} type="video/mp4" />}
      {shouldLoad && webmSrc && <source src={webmSrc} type="video/webm" />}
    </video>
  );
}
