import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTicketPageComponent } from './movie-ticket-page.component';

describe('MovieTicketPageComponent', () => {
  let component: MovieTicketPageComponent;
  let fixture: ComponentFixture<MovieTicketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTicketPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTicketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
