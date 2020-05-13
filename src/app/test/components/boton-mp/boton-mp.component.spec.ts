import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonMpComponent } from './boton-mp.component';

describe('BotonMpComponent', () => {
  let component: BotonMpComponent;
  let fixture: ComponentFixture<BotonMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
