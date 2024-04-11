import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloformComponent } from './modeloform.component';

describe('ModeloformComponent', () => {
  let component: ModeloformComponent;
  let fixture: ComponentFixture<ModeloformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeloformComponent]
    });
    fixture = TestBed.createComponent(ModeloformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
