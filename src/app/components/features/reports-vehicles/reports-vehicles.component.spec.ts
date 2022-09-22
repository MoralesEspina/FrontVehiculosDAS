import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsVehiclesComponent } from './reports-vehicles.component';

describe('ReportsVehiclesComponent', () => {
  let component: ReportsVehiclesComponent;
  let fixture: ComponentFixture<ReportsVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
