import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/api/interfaces/genre';
import { JikanDataService } from 'src/app/api/jikan-data-service.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genres: Genre[] | null = null;

  constructor(private jikanDataService: JikanDataService) {}

  ngOnInit(): void {
    this.jikanDataService.getGenres$().subscribe({
      next: ({ data }) => {
        console.log(data)
        this.genres = data;
      },
    });
  }
}