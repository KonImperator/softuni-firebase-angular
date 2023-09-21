import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SingularGenre } from 'src/app/api/interfaces/genre';
import { JikanDataService } from 'src/app/api/jikan-data.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
})
export class GenreListComponent {
  genres: Observable<{ data: SingularGenre[] }> = this.jikanDataService.genres$;

  constructor(private jikanDataService: JikanDataService) {}
}
