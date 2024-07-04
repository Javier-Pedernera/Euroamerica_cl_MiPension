import { TestBed } from '@angular/core/testing';

import { CalendarioDePagosService } from './calendario-de-pagos.service';

describe('CalendarioDePagosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarioDePagosService = TestBed.get(CalendarioDePagosService);
    expect(service).toBeTruthy();
  });
});
