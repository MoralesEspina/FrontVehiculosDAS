import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRequestIndexComponent } from './local-request-index.component';

describe('LocalTransportationIndexComponent', () => {
  let component: LocalRequestIndexComponent;
  let fixture: ComponentFixture<LocalRequestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalRequestIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalRequestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
