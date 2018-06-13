import { TestBed, inject } from '@angular/core/testing';

import { TsvToJsonService } from './tsv-to-json.service';

describe('XmlToJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TsvToJsonService]
    });
  });

  it('should be created', inject([TsvToJsonService], (service: TsvToJsonService) => {
    expect(service).toBeTruthy();
  }));
});
