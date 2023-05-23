import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeedbackDialogComponent } from './manage-feedback-dialog.component';

describe('ManageFeedbackDialogComponent', () => {
  let component: ManageFeedbackDialogComponent;
  let fixture: ComponentFixture<ManageFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFeedbackDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
