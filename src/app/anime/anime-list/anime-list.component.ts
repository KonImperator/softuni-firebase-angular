import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { AnimeList } from 'src/app/api/interfaces/anime';
import { JikanDataService } from 'src/app/api/jikan-data.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})

export class AnimeListComponent implements OnInit, OnDestroy {
  animeList$: Observable<AnimeList> | null = null;

  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private jikanDataService: JikanDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.queryParams, this.route.params])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([queryParams, params]) => {
        const page = Number(queryParams['p']) || 1;
        const genre = Number(params['genreId']) || undefined;
        const searchQuery = queryParams['q'] || undefined;
        this.fetchAnimeList(page, genre, searchQuery);
      });
  }

  fetchAnimeList(page: number, genre: number | undefined, searchQuery: string | undefined) {
    this.animeList$ = this.jikanDataService
      .getAllAnime$(page, genre, searchQuery)
      .pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
