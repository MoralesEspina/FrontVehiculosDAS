import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalTransportationRequestComponent } from './local-transportation-request.component';

describe('LocalTransportationRequestComponent', () => {
  let component: LocalTransportationRequestComponent;
  let fixture: ComponentFixture<LocalTransportationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalTransportationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalTransportationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
