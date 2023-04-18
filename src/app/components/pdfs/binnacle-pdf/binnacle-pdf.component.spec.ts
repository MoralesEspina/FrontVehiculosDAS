import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinnaclePdfComponent } from './binnacle-pdf.component';

describe('BinnaclePdfComponent', () => {
  let component: BinnaclePdfComponent;
  let fixture: ComponentFixture<BinnaclePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinnaclePdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinnaclePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
