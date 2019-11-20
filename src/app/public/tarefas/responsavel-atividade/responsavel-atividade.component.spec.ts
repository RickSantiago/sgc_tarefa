import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelAtividadeComponent } from './responsavel-atividade.component';

describe('ResponsavelAtividadeComponent', () => {
  let component: ResponsavelAtividadeComponent;
  let fixture: ComponentFixture<ResponsavelAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsavelAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
