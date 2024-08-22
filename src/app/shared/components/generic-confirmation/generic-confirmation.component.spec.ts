import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericConfirmationComponent } from './generic-confirmation.component';

describe('GenericConfirmationComponent', () => {
  let component: GenericConfirmationComponent;
  let fixture: ComponentFixture<GenericConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
