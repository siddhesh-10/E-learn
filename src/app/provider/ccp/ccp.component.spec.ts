import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpComponent } from './ccp.component';

describe('CcpComponent', () => {
  let component: CcpComponent;
  let fixture: ComponentFixture<CcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
