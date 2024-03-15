import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmacionComponent } from './dialog-confirmacion.component';

describe('DialogConfirmacionComponent', () => {
  let component: DialogConfirmacionComponent;
  let fixture: ComponentFixture<DialogConfirmacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmacionComponent]
    });
    fixture = TestBed.createComponent(DialogConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
