import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryDialogComponent } from './recovery-dialog.component';

describe('RecoveryDialogComponent', () => {
  let component: RecoveryDialogComponent;
  let fixture: ComponentFixture<RecoveryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
