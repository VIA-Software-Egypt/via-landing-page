import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Reveal } from './reveal';

@Component({ imports: [Reveal], template: '<article viaReveal>Project</article>' })
class RevealHost {}

describe('Reveal timing', () => {
  let intersect: IntersectionObserverCallback;
  let mediaChange: () => void;
  let reduced = false;
  let top = 1200;
  const player = {
    pause: vi.fn(),
    play: vi.fn(),
    cancel: vi.fn(),
    currentTime: null,
    onfinish: null,
  };
  const animate = vi.fn(() => player);
  const originalAnimate = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'animate');

  beforeEach(() => {
    reduced = false;
    top = 1200;
    vi.clearAllMocks();
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate });
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () => new DOMRect(0, top, 300, 200),
    );
    vi.stubGlobal('matchMedia', (query: string) => ({
      get matches() {
        return query.includes('reduce') ? reduced : true;
      },
      addEventListener: (_: string, callback: () => void) => {
        mediaChange = callback;
      },
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersect = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    if (originalAnimate) Object.defineProperty(HTMLElement.prototype, 'animate', originalAnimate);
    else Reflect.deleteProperty(HTMLElement.prototype, 'animate');
  });

  async function mount() {
    const fixture = TestBed.createComponent(RevealHost);
    await fixture.whenStable();
    return fixture;
  }

  function enter(y: number) {
    intersect(
      [{ isIntersecting: true, boundingClientRect: { top: y } } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  }

  it('never fades already-painted first-viewport content back to zero', async () => {
    top = 50;
    await mount();
    expect(animate).not.toHaveBeenCalled();
  });

  it('prepares below-fold content before entry and plays it once visible', async () => {
    await mount();
    expect(player.pause).toHaveBeenCalledOnce();
    expect(player.play).not.toHaveBeenCalled();
    enter(400);
    expect(player.play).toHaveBeenCalledOnce();
  });

  it('shows content immediately if a fast swipe has already passed its top', async () => {
    await mount();
    enter(-100);
    expect(player.cancel).toHaveBeenCalled();
    expect(player.play).not.toHaveBeenCalled();
  });

  it('reveals waiting content immediately when Reduce Motion is enabled', async () => {
    await mount();
    reduced = true;
    mediaChange();
    expect(player.cancel).toHaveBeenCalled();
  });
});
