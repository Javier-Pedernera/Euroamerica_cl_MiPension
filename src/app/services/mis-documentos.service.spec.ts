import { TestBed } from '@angular/core/testing';

import { MisDocumentosService } from './mis-documentos.service';

describe('MisDocumentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MisDocumentosService = TestBed.get(MisDocumentosService);
    expect(service).toBeTruthy();
  });
});
