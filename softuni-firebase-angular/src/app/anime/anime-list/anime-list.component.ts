import { Component, OnInit } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AnimeList } from 'src/app/api/interfaces/anime';
import { Genre } from 'src/app/api/interfaces/anime';
import { JikanDataService } from 'src/app/api/jikan-data-service.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
  animeList: AnimeList | null = null;

  constructor(private jikanDataService: JikanDataService) {}

  ngOnInit(): void {
    this.jikanDataService
      .getAllAnime$()
      .pipe(
        map((anime) => {
          const newData = anime.data.map((data) => {
            return typeof data.genres === 'string'
              ? data
              : { ...data, genres: data.genres
                    .map((genre: Genre) => genre.name)
                    .join(', '),
                };
          });
          return { ...anime, data: newData };
        }),
        tap((data) => {
          this.animeList = data;
        }), shareReplay()
      )
      .subscribe();
  }
}
