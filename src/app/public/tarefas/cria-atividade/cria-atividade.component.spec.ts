import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaAtividadeComponent } from './cria-atividade.component';

describe('CriaAtividadeComponent', () => {
  let component: CriaAtividadeComponent;
  let fixture: ComponentFixture<CriaAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriaAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriaAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
