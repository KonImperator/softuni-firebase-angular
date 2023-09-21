import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeCardComponent } from './anime-card.component';

describe('AnimeCardComponent', () => {
  let component: AnimeCardComponent;
  let fixture: ComponentFixture<AnimeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimeCardComponent]
    });
    fixture = TestBed.createComponent(AnimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
