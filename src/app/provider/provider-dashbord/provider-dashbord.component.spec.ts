import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashbordComponent } from './provider-dashbord.component';

describe('ProviderDashbordComponent', () => {
  let component: ProviderDashbordComponent;
  let fixture: ComponentFixture<ProviderDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
