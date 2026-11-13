import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/** Animate the sculpture only while its pixels are visible and its image is ready. */
@Directive({ selector: 'img[viaAmbientMotion]', host: { 'data-motion': 'paused' } })
export class AmbientMotion {
  constructor() {
    const image = inject(ElementRef<HTMLImageElement>).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) return;
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      let inView = false;
      const update = () => {
        const running =
          inView &&
          !document.hidden &&
          !preference.matches &&
          image.complete &&
          image.naturalWidth > 0;
        image.dataset['motion'] = running ? 'running' : 'paused';
      };
      const observer = new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        update();
      });
      observer.observe(image);
      image.addEventListener('load', update);
      preference.addEventListener('change', update);
      document.addEventListener('visibilitychange', update);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        image.removeEventListener('load', update);
        preference.removeEventListener('change', update);
        document.removeEventListener('visibilitychange', update);
      });
    });
  }
}
