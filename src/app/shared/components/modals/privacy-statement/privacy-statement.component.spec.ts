import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyStatementComponent } from './privacy-statement.component';

describe('PrivacyStatementComponent', () => {
  let component: PrivacyStatementComponent;
  let fixture: ComponentFixture<PrivacyStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
