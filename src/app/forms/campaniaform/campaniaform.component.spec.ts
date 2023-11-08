import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniaformComponent } from './campaniaform.component';

describe('CampaniaformComponent', () => {
  let component: CampaniaformComponent;
  let fixture: ComponentFixture<CampaniaformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaniaformComponent]
    });
    fixture = TestBed.createComponent(CampaniaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
