import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookFilesDialogComponent } from './upload-book-files-dialog.component';

describe('UploadBookFilesDialogComponent', () => {
  let component: UploadBookFilesDialogComponent;
  let fixture: ComponentFixture<UploadBookFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBookFilesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBookFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
