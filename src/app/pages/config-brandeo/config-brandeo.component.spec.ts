import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBrandeoComponent } from './config-brandeo.component';

describe('ConfigBrandeoComponent', () => {
  let component: ConfigBrandeoComponent;
  let fixture: ComponentFixture<ConfigBrandeoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigBrandeoComponent]
    });
    fixture = TestBed.createComponent(ConfigBrandeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
