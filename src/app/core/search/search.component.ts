import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private router: Router) {}
  findAnime(input: string) {
    if (!input) {
      return this.router.navigateByUrl('/anime');
    }
    return this.router.navigateByUrl(`/anime?q=${input}`);
  }

  enterSearch(event: KeyboardEvent, input: string) {
    if (event.key === 'Enter') {
      this.findAnime(input);
    }
  }
}
