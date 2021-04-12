import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieworedersComponent } from './vieworeders.component';

describe('VieworedersComponent', () => {
  let component: VieworedersComponent;
  let fixture: ComponentFixture<VieworedersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VieworedersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VieworedersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
