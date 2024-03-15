import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigVehiculosComponent } from './config-vehiculos.component';

describe('ConfigVehiculosComponent', () => {
  let component: ConfigVehiculosComponent;
  let fixture: ComponentFixture<ConfigVehiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigVehiculosComponent]
    });
    fixture = TestBed.createComponent(ConfigVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
