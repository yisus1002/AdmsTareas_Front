import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsDetailComponent } from './catalogs-detail.component';

describe('CatalogsDetailComponent', () => {
  let component: CatalogsDetailComponent;
  let fixture: ComponentFixture<CatalogsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
