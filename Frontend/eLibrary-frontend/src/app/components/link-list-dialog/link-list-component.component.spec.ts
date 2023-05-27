import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkListComponentComponent } from './link-list-component.component';

describe('LinkListComponentComponent', () => {
  let component: LinkListComponentComponent;
  let fixture: ComponentFixture<LinkListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
