import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AnimeData } from 'src/app/api/interfaces/anime';
import { JikanDataService } from 'src/app/api/jikan-data.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  anime: Observable<AnimeData> | null = null;
  animeId = this.route.snapshot.params['id'];

  constructor(private jikanDataService: JikanDataService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.anime = this.fetchAnime(this.animeId);
  }

  fetchAnime(animeId: number){
    return this.jikanDataService.getAnimeById(animeId).pipe(map((anime) => anime.data));
  }
}
