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

    getRandomColor(id: number) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return !this.removedTempStates[id] ? color : 'red'
    }

    ngOnInit(): void {
      if (this.router.url.endsWith('list-liked')) {
        this.animeList = this.animeService.getAllAnimeInList('likedList');
        this.listType = 'likedList';
      } else if (this.router.url.endsWith('list-watched')) {
        this.animeList = this.animeService.getAllAnimeInList('watchlist');
        this.listType = 'watchlist';
      }
    }

    toggle(anime: FormattedAnime) {
      this.animeService.toggleInList(anime, this.listType!);
      this.removedTempStates[anime.mal_id] = !this.removedTempStates[anime.mal_id];
    }
  }
