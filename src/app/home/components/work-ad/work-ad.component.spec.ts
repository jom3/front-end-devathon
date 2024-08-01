import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAdComponent } from './work-ad.component';

describe('WorkAdComponent', () => {
  let component: WorkAdComponent;
  let fixture: ComponentFixture<WorkAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
