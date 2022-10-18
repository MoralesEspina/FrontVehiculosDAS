import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRequestMantComponent } from './local-request.component';

describe('LocalRequestMantComponent', () => {
  let component: LocalRequestMantComponent;
  let fixture: ComponentFixture<LocalRequestMantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalRequestMantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalRequestMantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
