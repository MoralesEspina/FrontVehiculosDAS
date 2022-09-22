import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVPComponent } from './assign-v-p.component';

describe('AssignVPComponent', () => {
  let component: AssignVPComponent;
  let fixture: ComponentFixture<AssignVPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignVPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignVPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
