  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormattedAnime } from 'src/app/api/interfaces/anime';
  import { AnimeService } from '../anime.service';
  import { MyList } from '../types';

  @Component({
    selector: 'app-my-list',
    templateUrl: './my-list.component.html',
    styleUrls: ['./my-list.component.css'],
  })
  export class MyListComponent implements OnInit {
    animeList: Promise<FormattedAnime[]> | null = null;
    listType: MyList | null = null;
    removedTempStates: { [key: number]: boolean } = {};

    constructor(private animeService: AnimeService, private router: Router) {}

    ngOnInit(): void {
      if (this.router.url.endsWith('list-liked')) {
        this.animeList = this.animeService.getAllAnimeInList('likedList');
        this.listType = 'likedList';
      } else if (this.router.url.endsWith('list-watched')) {
        this.animeList = this.animeService.getAllAnimeInList('watchlist');
        this.listType = 'watchlist';
      }
      this.animeList?.then((list) => console.log('List >', list))
    }

    toggle(anime: FormattedAnime) {
      this.animeService.toggleInList(anime, this.listType!);
      this.removedTempStates[anime.mal_id] = !this.removedTempStates[anime.mal_id];
    }
  }
