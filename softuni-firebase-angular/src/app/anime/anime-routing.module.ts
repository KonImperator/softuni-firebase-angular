import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { GenreListComponent } from './genre-list/genre-list.component';

const routes: Routes = [
  {
    path: 'genre', pathMatch: 'full', component: GenreListComponent
  },
  {
    path: 'anime', pathMatch: 'full', component: AnimeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
