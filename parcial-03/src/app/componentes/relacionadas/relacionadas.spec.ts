import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Relacionadas } from './relacionadas';

describe('Relacionadas', () => {
  let component: Relacionadas;
  let fixture: ComponentFixture<Relacionadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Relacionadas],
    }).compileComponents();

    fixture = TestBed.createComponent(Relacionadas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
