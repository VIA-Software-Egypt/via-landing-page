import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS, ProjectType } from '../projects';
import { ProjectService } from '../shared/project.service';
import { Reveal } from '../shared/reveal';
import { AmbientMotion } from '../shared/ambient-motion';

@Component({
  selector: 'via-home',
  imports: [RouterLink, Reveal, AmbientMotion],
  templateUrl: './home.html',
})
export class Home {
  protected readonly projects = inject(ProjectService);
  protected readonly filter = signal<ProjectType | 'all'>('all');
  private readonly portfolio = PROJECTS.slice(3).map((project) => ({
    ...project,
    preview: project.image.replace('.webp', '-preview.webp'),
  }));
  protected readonly filteredProjects = computed(() =>
    this.portfolio.filter((project) => this.filter() === 'all' || project.type === this.filter()),
  );
}
