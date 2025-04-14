import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewreportsComponent } from './adminviewreports.component';

describe('AdminviewreportsComponent', () => {
  let component: AdminviewreportsComponent;
  let fixture: ComponentFixture<AdminviewreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
