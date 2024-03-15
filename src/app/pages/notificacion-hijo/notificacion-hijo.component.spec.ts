import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionHijoComponent } from './notificacion-hijo.component';

describe('NotificacionHijoComponent', () => {
  let component: NotificacionHijoComponent;
  let fixture: ComponentFixture<NotificacionHijoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionHijoComponent]
    });
    fixture = TestBed.createComponent(NotificacionHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
