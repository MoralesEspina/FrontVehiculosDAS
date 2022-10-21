import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRequestPdfComponent } from './local-request-pdf.component';

describe('LocalRequestPdfComponent', () => {
  let component: LocalRequestPdfComponent;
  let fixture: ComponentFixture<LocalRequestPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalRequestPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalRequestPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
