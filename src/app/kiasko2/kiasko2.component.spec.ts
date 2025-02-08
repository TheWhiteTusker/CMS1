import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kiasko2Component } from './kiasko2.component';

describe('Kiasko2Component', () => {
  let component: Kiasko2Component;
  let fixture: ComponentFixture<Kiasko2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Kiasko2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Kiasko2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
