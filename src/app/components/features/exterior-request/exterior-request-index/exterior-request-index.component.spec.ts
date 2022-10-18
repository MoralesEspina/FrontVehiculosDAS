import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExteriorRequestIndexComponent } from './exterior-request-index.component';

describe('ExteriorRequestIndexComponent', () => {
  let component: ExteriorRequestIndexComponent;
  let fixture: ComponentFixture<ExteriorRequestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExteriorRequestIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExteriorRequestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
