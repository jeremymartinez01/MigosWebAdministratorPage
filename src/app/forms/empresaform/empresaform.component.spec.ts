import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaformComponent } from './empresaform.component';

describe('EmpresaformComponent', () => {
  let component: EmpresaformComponent;
  let fixture: ComponentFixture<EmpresaformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaformComponent]
    });
    fixture = TestBed.createComponent(EmpresaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
