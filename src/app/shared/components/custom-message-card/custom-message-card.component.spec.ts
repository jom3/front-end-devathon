import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageCardComponent } from './custom-message-card.component';

describe('CustomMessageCardComponent', () => {
  let component: CustomMessageCardComponent;
  let fixture: ComponentFixture<CustomMessageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMessageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMessageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
