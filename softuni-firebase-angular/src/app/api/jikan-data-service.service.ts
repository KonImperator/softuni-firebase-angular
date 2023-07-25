import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from './interfaces/genre';

const { dataApiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class JikanDataService {

  constructor(private http: HttpClient) { }

  getGenres$(): Observable<{data: Genre[]}>  {
    return this.http.get<{data: Genre[]}>(`${dataApiUrl}genres/anime`)
  }
}
