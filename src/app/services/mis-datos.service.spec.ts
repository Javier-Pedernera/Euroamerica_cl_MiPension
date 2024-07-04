import { TestBed } from '@angular/core/testing';

import { MisDatosService } from './mis-datos.service';

describe('MisDatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MisDatosService = TestBed.get(MisDatosService);
    expect(service).toBeTruthy();
  });
});
