import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinUsAdComponent } from './join-us-ad.component';

describe('JoinUsAdComponent', () => {
  let component: JoinUsAdComponent;
  let fixture: ComponentFixture<JoinUsAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinUsAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinUsAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
