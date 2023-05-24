import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLinkDialogComponent } from './update-link-dialog.component';

describe('UpdateLinkDialogComponent', () => {
  let component: UpdateLinkDialogComponent;
  let fixture: ComponentFixture<UpdateLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLinkDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
