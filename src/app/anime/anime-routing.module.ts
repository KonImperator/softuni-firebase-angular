import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { MyListComponent } from './my-list/my-list.component';

const routes: Routes = [
  {
    path: 'anime',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AnimeListComponent,
        title: 'Anime Galaxy - Anime List'
      },
      {
        path: 'genre',
        pathMatch: 'full',
        component: GenreListComponent,
        title: 'Anime Galaxy - Genres'
      },
      {
        path: ':id/:animeName',
        component: AnimeDetailComponent,
        title: 'Anime Galaxy - Details'
      },
      {
        path: 'genre/:genreId/:genreName',
        component: AnimeListComponent,
        title: 'Anime Galaxy - Anime List'
      },
      {
        path: 'list-liked',
        component: MyListComponent,
        title: 'Anime Galaxy - My lists'
      },
      {
        path: 'list-watched',
        component: MyListComponent,
        title: 'Anime Galaxy - My lists'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
