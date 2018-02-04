import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaHistoryComponent } from './ada-history.component';

describe('AdaHistoryComponent', () => {
  let component: AdaHistoryComponent;
  let fixture: ComponentFixture<AdaHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
