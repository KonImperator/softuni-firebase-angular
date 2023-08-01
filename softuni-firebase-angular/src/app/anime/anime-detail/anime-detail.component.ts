import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AnimeData } from 'src/app/api/interfaces/anime';
import { JikanDataService } from 'src/app/api/jikan-data-service.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  anime: Observable<AnimeData> | null = null;

  constructor(private jikanDataService: JikanDataService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const animeId = this.route.snapshot.params['id'];
    this.anime = this.fetchAnime(animeId);
  }

  fetchAnime(animeId: number){
    return this.jikanDataService.getAnimeById(animeId).pipe(map((anime) => anime.data));
  }
}
