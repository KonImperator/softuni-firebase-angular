import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { AnimeList } from 'src/app/api/interfaces/anime';
import { JikanDataService } from 'src/app/api/jikan-data.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit, OnDestroy {
  animeList: AnimeList | null = null;
  page: number = 1;
  genre: number | undefined;

  unsubscribe$: Subject<void> = new Subject();

  constructor(private jikanDataService: JikanDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    combineLatest([this.route.queryParams, this.route.params])
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(([queryParams, params]) => {
      this.page = Number(queryParams['p']) || 1;
      this.genre = Number(params['genreId']) || undefined
      this.fetchAnimeList();
    })
  
    
  }

  fetchAnimeList() {
    const allAnime$ = this.jikanDataService.getAllAnime$(this.page, this.genre).pipe(takeUntil(this.unsubscribe$));
    if (this.genre){
      return allAnime$.subscribe((data) => this.animeList = data);
    }
    return allAnime$.subscribe((data) => this.animeList = data);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
