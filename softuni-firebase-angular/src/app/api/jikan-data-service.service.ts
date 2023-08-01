import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnimeData, AnimeList, Genre } from './interfaces/anime';
import { SingularGenre } from './interfaces/genre';

const { dataApiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class JikanDataService {
  genres$: Observable<{ data: SingularGenre[] }>
  
  constructor(private http: HttpClient) {
    this.genres$ = this.getGenres$().pipe(shareReplay(1))
  }

  formatGenres(animeData: AnimeList): any {
    const newData = animeData.data.map((data) => {
      return typeof data.genres === 'string'
        ? data
        : { ...data, genres: data.genres
              .map((genre: Genre) => genre.name)
              .join(', '),
          };
    });
    return { ...animeData, data: newData };
  }

  getGenres$(): Observable<{ data: SingularGenre[] }> {
    return this.http.get<{ data: SingularGenre[] }>(`${dataApiUrl}genres/anime`);
  }

  getAllAnime$(page: number = 1, genreId?: number): Observable<AnimeList> {
    if (genreId) {
      return this.http.get<AnimeList>(`${dataApiUrl}anime?page=${page}&genres=${genreId}`)
      .pipe(map((anime) => this.formatGenres(anime)));
    }
    return this.http.get<AnimeList>(`${dataApiUrl}anime?page=${page}`)
    .pipe(map((anime) => this.formatGenres(anime)));
  }

  getAnimeById(id: number): Observable<{data: AnimeData }> {
    return this.http.get<{data: AnimeData }>(`${dataApiUrl}anime/${id}`);
  }
}
