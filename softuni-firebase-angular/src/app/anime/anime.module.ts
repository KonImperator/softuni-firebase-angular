import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreListComponent } from './genre-list/genre-list.component';
import { RouterModule } from '@angular/router';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GenreListComponent, AnimeCardComponent, AnimeListComponent],
  imports: [CommonModule, RouterModule, AnimeRoutingModule, SharedModule],
})
export class AnimeModule {}
