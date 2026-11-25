import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCancion } from './nueva-cancion';

describe('NuevaCancion', () => {
  let component: NuevaCancion;
  let fixture: ComponentFixture<NuevaCancion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCancion],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaCancion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
