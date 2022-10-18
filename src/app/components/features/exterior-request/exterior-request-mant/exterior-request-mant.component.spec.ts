import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorRequestMantComponent } from './exterior-request-mant.component';

describe('ExteriorRequestMantComponent', () => {
  let component: ExteriorRequestMantComponent;
  let fixture: ComponentFixture<ExteriorRequestMantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExteriorRequestMantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExteriorRequestMantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
