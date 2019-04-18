/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotesListService } from './notes-list.service';

describe('Service: NotesList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesListService]
    });
  });

  it('should ...', inject([NotesListService], (service: NotesListService) => {
    expect(service).toBeTruthy();
  }));
});
