import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
    title: 'VIA Software Egypt — Software for how you work.',
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news').then((m) => m.News),
    title: 'News & project notes — VIA Software Egypt',
  },
  { path: 'news.html', redirectTo: 'news', pathMatch: 'full' },
  { path: 'index.html', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
