import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaformComponent } from './marcaform.component';

describe('MarcaformComponent', () => {
  let component: MarcaformComponent;
  let fixture: ComponentFixture<MarcaformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcaformComponent]
    });
    fixture = TestBed.createComponent(MarcaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
