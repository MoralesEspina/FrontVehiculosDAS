import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorRequestPdfComponent } from './exterior-request-pdf.component';

describe('ExteriorRequestPdfComponent', () => {
  let component: ExteriorRequestPdfComponent;
  let fixture: ComponentFixture<ExteriorRequestPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExteriorRequestPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExteriorRequestPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
