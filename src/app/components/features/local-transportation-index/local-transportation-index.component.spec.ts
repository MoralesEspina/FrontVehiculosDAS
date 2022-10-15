import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalTransportationIndexComponent } from './local-transportation-index.component';

describe('LocalTransportationIndexComponent', () => {
  let component: LocalTransportationIndexComponent;
  let fixture: ComponentFixture<LocalTransportationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalTransportationIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalTransportationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
