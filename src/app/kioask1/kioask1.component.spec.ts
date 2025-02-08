import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kioask1Component } from './kioask1.component';

describe('Kioask1Component', () => {
  let component: Kioask1Component;
  let fixture: ComponentFixture<Kioask1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Kioask1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Kioask1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
