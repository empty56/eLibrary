import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookLinksDialogComponent } from './add-book-links-dialog.component';

describe('AddBookLinksDialogComponent', () => {
  let component: AddBookLinksDialogComponent;
  let fixture: ComponentFixture<AddBookLinksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookLinksDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookLinksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
