import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariocatalogComponent } from './formulariocatalog.component';

describe('FormulariocatalogComponent', () => {
  let component: FormulariocatalogComponent;
  let fixture: ComponentFixture<FormulariocatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulariocatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariocatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
