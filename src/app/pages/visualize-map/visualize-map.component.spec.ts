import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeMapComponent } from './visualize-map.component';

describe('VisualizeMapComponent', () => {
  let component: VisualizeMapComponent;
  let fixture: ComponentFixture<VisualizeMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizeMapComponent]
    });
    fixture = TestBed.createComponent(VisualizeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
