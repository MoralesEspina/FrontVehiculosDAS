import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidevehicleMantComponent } from './outsidevehicle-mant.component';

describe('OutsidevehicleMantComponent', () => {
  let component: OutsidevehicleMantComponent;
  let fixture: ComponentFixture<OutsidevehicleMantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsidevehicleMantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsidevehicleMantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
