import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSectoresComponent } from './config-sectores.component';

describe('ConfigSectoresComponent', () => {
  let component: ConfigSectoresComponent;
  let fixture: ComponentFixture<ConfigSectoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigSectoresComponent]
    });
    fixture = TestBed.createComponent(ConfigSectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
