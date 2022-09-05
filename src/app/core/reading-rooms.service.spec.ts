import { TestBed } from '@angular/core/testing';

import { ReadingRoomsService } from './reading-rooms.service';

describe('ReadingRoomsService', () => {
  let service: ReadingRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
