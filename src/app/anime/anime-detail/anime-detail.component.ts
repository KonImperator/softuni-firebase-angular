import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { AnimeData, FormattedAnime } from 'src/app/api/interfaces/anime';
import { JikanDataService } from 'src/app/api/jikan-data.service';
import { UserService } from 'src/app/user/user.service';
import { AnimeService } from '../anime.service';
import { MyList } from '../types';
@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css'],
})
export class AnimeDetailComponent implements OnInit {
  anime: FormattedAnime | null = null;
  animeId = this.route.snapshot.params['id'];
  user = this.userService.user$;
  inWatchlist: boolean;
  inLikedList: boolean;

  constructor(
    private jikanDataService: JikanDataService,
    private route: ActivatedRoute,
    private userService: UserService,
    private animeService: AnimeService
  ) {}
  ngOnInit(): void {
    this.fetchAnime(this.animeId).pipe(take(1)).subscribe((anime) => {
      this.anime = this.animeService.formatAnime(anime)
      this.checkIfInList('watchlist');
      this.checkIfInList('likedList');
    });
    
  }

  fetchAnime(animeId: number) {
    return this.jikanDataService
      .getAnimeById(animeId)
      .pipe(map((anime) => anime.data));
  }

  async checkIfInList(list: MyList){
      list == 'likedList' ? 
      this.inLikedList = await this.animeService.isAnimeInList(this.anime!.mal_id!, list) :
      this.inWatchlist = await this.animeService.isAnimeInList(this.anime!.mal_id!, list)  
  }

  // adds or removes from specified list
  async toggleAdd(list: MyList) {
    await this.animeService.toggleInList(this.anime!, list);
    await this.checkIfInList(list);
  }
}
