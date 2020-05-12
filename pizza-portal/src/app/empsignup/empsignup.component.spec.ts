import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsignupComponent } from './empsignup.component';

describe('EmpsignupComponent', () => {
  let component: EmpsignupComponent;
  let fixture: ComponentFixture<EmpsignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
