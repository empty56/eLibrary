import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookListComponent } from './search-book-list.component';

describe('SearchBookListComponent', () => {
  let component: SearchBookListComponent;
  let fixture: ComponentFixture<SearchBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
