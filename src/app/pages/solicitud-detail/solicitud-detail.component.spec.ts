import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDetailComponent } from './solicitud-detail.component';

describe('SolicitudDetailComponent', () => {
  let component: SolicitudDetailComponent;
  let fixture: ComponentFixture<SolicitudDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudDetailComponent]
    });
    fixture = TestBed.createComponent(SolicitudDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
