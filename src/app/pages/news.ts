import { Component, inject } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { Reveal } from '../shared/reveal';

@Component({
  selector: 'via-news',
  imports: [Reveal],
  templateUrl: './news.html',
})
export class News {
  protected readonly projects = inject(ProjectService);
}
