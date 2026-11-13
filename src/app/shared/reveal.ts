import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/** Progressive enhancement: content stays visible without JS or motion support. */
@Directive({ selector: '[viaReveal]' })
export class Reveal {
  constructor() {
    const element = inject(ElementRef<HTMLElement>).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (preference.matches || !('IntersectionObserver' in window) || !element.animate) return;
      // SSR/hydration has already painted the first viewport. Never fade it out again.
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight || rect.height === 0) return;
      const compact = window.matchMedia('(max-width: 700px), (pointer: coarse)').matches;
      const animation = element.animate(
        [
          { opacity: 0, transform: `translate3d(0, ${compact ? 10 : 18}px, 0)` },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: compact ? 440 : 580, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'both' },
      );
      // Prepare only offscreen content, before the observer can reveal it.
      animation.pause();
      animation.currentTime = 0;
      const settle = () => {
        observer.disconnect();
        animation.cancel(); // Restore normal rendering; no permanent compositing layer.
      };
      animation.onfinish = settle;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries.find((entry) => entry.isIntersecting);
          if (!entry) return;
          // A fast swipe or restored scroll position should show content immediately.
          if (preference.matches || entry.boundingClientRect.top < 0) settle();
          else animation.play();
          observer.disconnect();
        },
        { threshold: 0, rootMargin: '0px 0px -24px 0px' },
      );
      observer.observe(element);
      const onPreferenceChange = () => {
        if (preference.matches) settle();
      };
      const onVisibilityChange = () => {
        if (document.hidden) settle();
      };
      preference.addEventListener('change', onPreferenceChange);
      document.addEventListener('visibilitychange', onVisibilityChange);
      destroyRef.onDestroy(() => {
        settle();
        preference.removeEventListener('change', onPreferenceChange);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      });
    });
  }
}
