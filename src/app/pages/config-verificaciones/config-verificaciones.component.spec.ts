import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigVerificacionesComponent } from './config-verificaciones.component';

describe('ConfigVerificacionesComponent', () => {
  let component: ConfigVerificacionesComponent;
  let fixture: ComponentFixture<ConfigVerificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigVerificacionesComponent]
    });
    fixture = TestBed.createComponent(ConfigVerificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
