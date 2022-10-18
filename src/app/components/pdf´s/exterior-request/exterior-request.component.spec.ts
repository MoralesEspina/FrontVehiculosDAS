import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorRequestComponent } from './exterior-request.component';

describe('ExteriorRequestComponent', () => {
  let component: ExteriorRequestComponent;
  let fixture: ComponentFixture<ExteriorRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExteriorRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExteriorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
