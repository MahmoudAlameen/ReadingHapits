import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingRoomCardComponent } from './reading-room-card.component';

describe('ReadingRoomCardComponent', () => {
  let component: ReadingRoomCardComponent;
  let fixture: ComponentFixture<ReadingRoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingRoomCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
