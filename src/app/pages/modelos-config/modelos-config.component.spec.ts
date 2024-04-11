import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosConfigComponent } from './modelos-config.component';

describe('ModelosConfigComponent', () => {
  let component: ModelosConfigComponent;
  let fixture: ComponentFixture<ModelosConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelosConfigComponent]
    });
    fixture = TestBed.createComponent(ModelosConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
