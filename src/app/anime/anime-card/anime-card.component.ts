import { Component, Input } from '@angular/core';
import { AnimeData } from 'src/app/api/interfaces/anime';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css']
})
export class AnimeCardComponent {
  @Input() anime: AnimeData | null = null;
}
