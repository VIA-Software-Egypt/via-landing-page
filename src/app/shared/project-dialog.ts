import { DOCUMENT } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { ProjectService } from './project.service';

@Component({
  selector: 'via-project-dialog',
  template: `
    <dialog
      #dialog
      class="project-dialog"
      aria-labelledby="dialog-title"
      (cancel)="projects.close()"
      (close)="projects.close()"
      (click)="onBackdropClick($event)"
    >
      <button class="close" aria-label="Close project details" (click)="projects.close()" autofocus>
        ×
      </button>
      @if (projects.selected(); as project) {
        <div class="detail-copy">
          <span class="eyebrow">{{ project.category }}</span>
          <h2 id="dialog-title">{{ project.name }}</h2>
          <p>{{ project.description }}</p>
          <div class="detail-tags">
            @for (feature of project.features; track feature) {
              <span>{{ feature }}</span>
            }
          </div>
        </div>
        <div class="detail-gallery" tabindex="0" aria-label="Project screenshots">
          @for (image of project.gallery; track image) {
            <img
              [src]="'/assets/' + image"
              [alt]="project.name + ' application interface'"
              decoding="async"
            />
          }
        </div>
      }
    </dialog>
  `,
})
export class ProjectDialog {
  protected readonly projects = inject(ProjectService);
  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private previousFocus: HTMLElement | null = null;
  private previousOverflow = '';
  private modalActive = false;

  constructor() {
    afterRenderEffect(() => {
      const selected = this.projects.selected();
      const dialog = this.dialog().nativeElement;
      if (selected && !this.modalActive) {
        this.previousFocus = this.document.activeElement as HTMLElement | null;
        this.previousOverflow = this.document.body.style.overflow;
        this.document.body.style.overflow = 'hidden';
        this.modalActive = true;
        dialog.showModal();
        dialog.scrollTop = 0;
      } else if (!selected && this.modalActive) {
        this.modalActive = false;
        if (dialog.open) dialog.close();
        this.document.body.style.overflow = this.previousOverflow;
        if (this.previousFocus?.isConnected) this.previousFocus.focus({ preventScroll: true });
      }
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.modalActive) this.document.body.style.overflow = this.previousOverflow;
    });
  }

  protected onBackdropClick(event: MouseEvent): void {
    const dialog = this.dialog().nativeElement;
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      this.projects.close();
    }
  }
}
