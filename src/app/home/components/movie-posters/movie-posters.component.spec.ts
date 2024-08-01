import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePostersComponent } from './movie-posters.component';

describe('MoviePostersComponent', () => {
  let component: MoviePostersComponent;
  let fixture: ComponentFixture<MoviePostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePostersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
