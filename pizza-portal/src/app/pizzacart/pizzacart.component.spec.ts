import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzacartComponent } from './pizzacart.component';

describe('PizzacartComponent', () => {
  let component: PizzacartComponent;
  let fixture: ComponentFixture<PizzacartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzacartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzacartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
