import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithVideoComponent } from './page-with-video.component';

describe('PageWithVideoComponent', () => {
  let component: PageWithVideoComponent;
  let fixture: ComponentFixture<PageWithVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWithVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWithVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
