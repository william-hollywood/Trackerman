import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleGpsComponent } from './toggle-gps.component';

describe('ToggleGpsComponent', () => {
  let component: ToggleGpsComponent;
  let fixture: ComponentFixture<ToggleGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
