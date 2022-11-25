import { TestBed } from '@angular/core/testing';

import { ReadingRoomRepositoryService } from './reading-room-repository.service';

describe('ReadingRoomRepositoryService', () => {
  let service: ReadingRoomRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingRoomRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
