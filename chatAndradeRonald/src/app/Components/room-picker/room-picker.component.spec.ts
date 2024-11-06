import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPickerComponent } from './room-picker.component';

describe('RoomPickerComponent', () => {
  let component: RoomPickerComponent;
  let fixture: ComponentFixture<RoomPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
