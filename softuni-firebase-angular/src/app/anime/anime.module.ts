import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreComponent } from './genre/genre.component';
import { RouterModule } from '@angular/router';
import { AnimeRoutingModule } from './anime-routing.module';

@NgModule({
  declarations: [GenreComponent],
  imports: [CommonModule, RouterModule, AnimeRoutingModule],
})
export class AnimeModule {}
