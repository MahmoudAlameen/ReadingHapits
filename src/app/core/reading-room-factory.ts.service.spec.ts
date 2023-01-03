import { TestBed } from '@angular/core/testing';

import { ReadingRoomFactoryTsService } from './reading-room-factory.ts.service';

describe('ReadingRoomFactoryTsService', () => {
  let service: ReadingRoomFactoryTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingRoomFactoryTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
