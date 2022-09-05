import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingRoomsComponent } from './reading-rooms.component';

describe('ReadingRoomsComponent', () => {
  let component: ReadingRoomsComponent;
  let fixture: ComponentFixture<ReadingRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
