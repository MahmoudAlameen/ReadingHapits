import { TestBed } from '@angular/core/testing';

import { AdvertiseMessagesService } from './advertise-messages.service';

describe('AdvertiseMessagesService', () => {
  let service: AdvertiseMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertiseMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
