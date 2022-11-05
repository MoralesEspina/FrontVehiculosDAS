import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherRegularPdfComponent } from './voucher-regular-pdf.component';

describe('VoucherRegularPdfComponent', () => {
  let component: VoucherRegularPdfComponent;
  let fixture: ComponentFixture<VoucherRegularPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherRegularPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherRegularPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
