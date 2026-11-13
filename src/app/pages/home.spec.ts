import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Portfolio filtering', () => {
  it('filters the secondary portfolio while keeping featured projects visible', async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (() => ({ matches: true })) as unknown as typeof window.matchMedia;
    try {
      await TestBed.configureTestingModule({
        imports: [Home],
        providers: [provideRouter([])],
      }).compileComponents();
      const fixture = TestBed.createComponent(Home);
      await fixture.whenStable();
      const root = fixture.nativeElement as HTMLElement;
      expect(root.querySelectorAll('.more-projects article')).toHaveLength(6);
      root.querySelector<HTMLButtonElement>('[data-filter="web"]')!.click();
      await fixture.whenStable();
      expect(root.querySelectorAll('.more-projects article')).toHaveLength(1);
      expect(root.querySelector('.more-projects h3')?.textContent).toBe('Adele');
      expect(root.querySelector('#medcare')).toBeTruthy();
      expect(root.querySelectorAll('.mobile-projects article')).toHaveLength(2);
      root.querySelector<HTMLButtonElement>('[data-filter="desktop"]')!.click();
      await fixture.whenStable();
      expect(root.querySelector('.more-projects h3')?.textContent).toBe('Quarto');
      root.querySelector<HTMLButtonElement>('[data-filter="mobile"]')!.click();
      await fixture.whenStable();
      expect(root.querySelectorAll('.more-projects article')).toHaveLength(4);
      root.querySelector<HTMLButtonElement>('[data-filter="all"]')!.click();
      await fixture.whenStable();
      expect(root.querySelectorAll('.more-projects article')).toHaveLength(6);
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});
