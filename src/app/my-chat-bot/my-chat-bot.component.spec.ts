import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChatBotComponent } from './my-chat-bot.component';

describe('MyChatBotComponent', () => {
  let component: MyChatBotComponent;
  let fixture: ComponentFixture<MyChatBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyChatBotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyChatBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
