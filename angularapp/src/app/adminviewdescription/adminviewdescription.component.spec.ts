import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewdescriptionComponent } from './adminviewdescription.component';

describe('AdminviewdescriptionComponent', () => {
  let component: AdminviewdescriptionComponent;
  let fixture: ComponentFixture<AdminviewdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewdescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
