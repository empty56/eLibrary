import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagedBookListComponent } from './taged-book-list.component';

describe('TagedBookListComponent', () => {
  let component: TagedBookListComponent;
  let fixture: ComponentFixture<TagedBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagedBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagedBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
