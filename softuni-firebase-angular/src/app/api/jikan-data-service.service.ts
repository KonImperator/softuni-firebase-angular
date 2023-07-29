import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
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

  getGenres$(): Observable<{ data: SingularGenre[] }> {
    return this.http.get<{ data: SingularGenre[] }>(`${dataApiUrl}genres/anime`);
  }

  getAllAnime$(page: number = 1): Observable<AnimeList> {
    return this.http.get<AnimeList>(`${dataApiUrl}anime?page=${page}`);
  }

  getAnimeById(id: number): Observable<AnimeData> {
    return this.http.get<AnimeData>(`${dataApiUrl}anime/${id}`);
  }
}
