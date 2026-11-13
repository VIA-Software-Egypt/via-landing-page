import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Connect } from './shared/connect';
import { ProjectDialog } from './shared/project-dialog';
import { ProjectService } from './shared/project.service';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Connect, ProjectDialog],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly menuOpen = signal(false);
  protected readonly pagePath = signal('/');
  private readonly projects = inject(ProjectService);

  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.pagePath.set(event.urlAfterRedirects.split('#')[0]);
          this.closeMenu();
          this.projects.close();
        }
      });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!(event.target as Element)?.closest('.site-header')) this.closeMenu();
  }
}
