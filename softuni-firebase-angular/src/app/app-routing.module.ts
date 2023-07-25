import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { GenreComponent } from './anime/genre/genre.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  // { path: '**', component: HomeComponent },
  // 404 ERROR COMPONENT TO MAKE
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
