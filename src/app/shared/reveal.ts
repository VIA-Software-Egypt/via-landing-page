import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/** Progressive enhancement: content stays visible without JS or motion support. */
@Directive({ selector: '[viaReveal]' })
export class Reveal {
  constructor() {
    const element = inject(ElementRef<HTMLElement>).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (preference.matches || !('IntersectionObserver' in window)) return;
      let animation: Animation | undefined;
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          if (!preference.matches) {
            animation = element.animate(
              [
                { opacity: 0, transform: 'translateY(24px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 720, easing: 'cubic-bezier(.22,1,.36,1)' },
            );
          }
          observer.disconnect();
        },
        { threshold: 0.08 },
      );
      observer.observe(element);
      const onPreferenceChange = () => {
        if (preference.matches) animation?.cancel();
      };
      preference.addEventListener('change', onPreferenceChange);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        animation?.cancel();
        preference.removeEventListener('change', onPreferenceChange);
      });
    });
  }
}
