import { Injectable, signal } from '@angular/core';
import { PROJECTS, Project } from '../projects';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  readonly selected = signal<Project | null>(null);

  open(id: string): void {
    this.selected.set(PROJECTS.find((project) => project.id === id) ?? null);
  }

  close(): void {
    this.selected.set(null);
  }
}
