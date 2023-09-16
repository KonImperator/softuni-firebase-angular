import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnimeData, AnimeList } from './interfaces/anime';
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

  formatGenres<T extends {data: AnimeData } | AnimeList>(animeData: T): T {
    if ('pagination' in animeData){
    const newData = animeData.data.map((data) => {
      return typeof data.genres === 'string'
        ? data
        : { ...data, genres: data.genres
              .map((genre) => genre.name)
              .join(', '),
          };
    });
    return { ...animeData, data: newData };
  } else {
    const newData = { 
      ...animeData.data, 
      genres: typeof animeData.data.genres === 'string' ? 
      animeData.data.genres : 
      animeData.data.genres.map((genre) => genre.name).join(', ')
    }
    return { data: newData } as T;
  }
}

  getGenres$(): Observable<{ data: SingularGenre[] }> {
    return this.http.get<{ data: SingularGenre[] }>(`${dataApiUrl}genres/anime`);
  }

  getAllAnime$(page: number = 1, genreId?: number, searchQuery?: string): Observable<AnimeList> {
    const pageString = page ? `page=${page}&` : '';
    const genreIdString = genreId ? `genres=${genreId}&` : '';
    const searchString = searchQuery ? `q=${searchQuery}&` : '';

    const anime = this.http.get<AnimeList>(`${dataApiUrl}anime?${pageString}${genreIdString}${searchString}`);
    
    return anime.pipe(map((anime) => this.formatGenres(anime)));
  }

  getAnimeById(id: number): Observable<{data: AnimeData }> {
    return this.http.get<{data: AnimeData }>(`${dataApiUrl}anime/${id}`).pipe(map(this.formatGenres))
  }
}
