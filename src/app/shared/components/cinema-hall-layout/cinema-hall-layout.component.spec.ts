import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallLayoutComponent } from './cinema-hall-layout.component';

describe('CinemaHallLayoutComponent', () => {
  let component: CinemaHallLayoutComponent;
  let fixture: ComponentFixture<CinemaHallLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaHallLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaHallLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
