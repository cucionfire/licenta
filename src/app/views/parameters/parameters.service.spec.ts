/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParametersService } from './parameters.service';

describe('Service: Parameters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametersService]
    });
  });

  it('should ...', inject([ParametersService], (service: ParametersService) => {
    expect(service).toBeTruthy();
  }));
});
