import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { GenreListComponent } from './genre-list/genre-list.component';

const routes: Routes = [
  {
    path: 'anime',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AnimeListComponent,
      },
      {
        path: 'genre',
        pathMatch: 'full',
        component: GenreListComponent,
      },
      {
        path: ':id/:animeName',
        component: AnimeDetailComponent,
      },
      {
        path: 'genre/:genreId/:genreName',
        component: AnimeListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
