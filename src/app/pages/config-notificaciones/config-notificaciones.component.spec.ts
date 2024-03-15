import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigNotificacionesComponent } from './config-notificaciones.component';

describe('ConfigNotificacionesComponent', () => {
  let component: ConfigNotificacionesComponent;
  let fixture: ComponentFixture<ConfigNotificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigNotificacionesComponent]
    });
    fixture = TestBed.createComponent(ConfigNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
