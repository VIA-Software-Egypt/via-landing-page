import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('toggles mobile navigation and closes it after choosing a destination', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector<HTMLButtonElement>('.menu')!;
    menu.click();
    await fixture.whenStable();
    expect(menu.getAttribute('aria-expanded')).toBe('true');
    expect(compiled.querySelector('nav')?.classList.contains('open')).toBe(true);
    compiled.querySelector<HTMLAnchorElement>('nav a')!.click();
    await fixture.whenStable();
    expect(menu.getAttribute('aria-expanded')).toBe('false');
  });
});
