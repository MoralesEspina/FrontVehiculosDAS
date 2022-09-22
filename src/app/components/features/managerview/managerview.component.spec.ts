import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewComponent } from './managerview.component';

describe('ManagerviewComponent', () => {
  let component: ManagerviewComponent;
  let fixture: ComponentFixture<ManagerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
