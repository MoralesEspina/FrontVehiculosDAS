import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidevehicleIndexComponent } from './outsidevehicle-index.component';

describe('OutsidevehicleIndexComponent', () => {
  let component: OutsidevehicleIndexComponent;
  let fixture: ComponentFixture<OutsidevehicleIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsidevehicleIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsidevehicleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
