import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingsComponent } from './addShippings.component';

describe('AddcategoriesComponent', () => {
  let component: AddShippingsComponent;
  let fixture: ComponentFixture<AddShippingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShippingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
