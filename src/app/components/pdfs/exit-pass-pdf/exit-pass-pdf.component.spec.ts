import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitPassPdfComponent } from './exit-pass-pdf.component';

describe('ExitPassPdfComponent', () => {
  let component: ExitPassPdfComponent;
  let fixture: ComponentFixture<ExitPassPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitPassPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitPassPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
