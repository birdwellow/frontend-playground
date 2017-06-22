import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test3dcomponentComponent } from './test3dcomponent.component';

describe('Test3dcomponentComponent', () => {
  let component: Test3dcomponentComponent;
  let fixture: ComponentFixture<Test3dcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test3dcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test3dcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
