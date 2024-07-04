import { TestBed } from '@angular/core/testing';

import { LiquidacionesService } from './liquidaciones.service';

describe('LiquidacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiquidacionesService = TestBed.get(LiquidacionesService);
    expect(service).toBeTruthy();
  });
});
