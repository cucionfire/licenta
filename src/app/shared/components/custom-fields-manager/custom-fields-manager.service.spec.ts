/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomFieldsManagerService } from './custom-fields-manager.service';

describe('Service: CustomFieldsManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomFieldsManagerService]
    });
  });

  it('should ...', inject([CustomFieldsManagerService], (service: CustomFieldsManagerService) => {
    expect(service).toBeTruthy();
  }));
});
