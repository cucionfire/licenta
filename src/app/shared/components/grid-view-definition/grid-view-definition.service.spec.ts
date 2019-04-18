/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GridViewDefinitionService } from './grid-view-definition.service';

describe('Service: GridViewDefinition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridViewDefinitionService]
    });
  });

  it('should ...', inject([GridViewDefinitionService], (service: GridViewDefinitionService) => {
    expect(service).toBeTruthy();
  }));
});
