import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreComponent } from './genre/genre.component';

const routes: Routes = [
  {
    path: 'genre', pathMatch: 'full', component: GenreComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
