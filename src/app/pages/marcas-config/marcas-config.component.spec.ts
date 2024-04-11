import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasConfigComponent } from './marcas-config.component';

describe('MarcasConfigComponent', () => {
  let component: MarcasConfigComponent;
  let fixture: ComponentFixture<MarcasConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcasConfigComponent]
    });
    fixture = TestBed.createComponent(MarcasConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
