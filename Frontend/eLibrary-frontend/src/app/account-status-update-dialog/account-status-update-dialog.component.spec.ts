import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatusUpdateDialogComponent } from './account-status-update-dialog.component';

describe('AccountStatusUpdateDialogComponent', () => {
  let component: AccountStatusUpdateDialogComponent;
  let fixture: ComponentFixture<AccountStatusUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountStatusUpdateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountStatusUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
