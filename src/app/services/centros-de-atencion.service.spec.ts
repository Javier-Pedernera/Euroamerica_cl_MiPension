import { TestBed } from '@angular/core/testing';

import { CentrosDeAtencionService } from './centros-de-atencion.service';

describe('CentrosDeAtencionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentrosDeAtencionService = TestBed.get(CentrosDeAtencionService);
    expect(service).toBeTruthy();
  });
});
