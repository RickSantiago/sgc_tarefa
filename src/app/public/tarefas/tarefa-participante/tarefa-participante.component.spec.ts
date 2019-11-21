import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaParticipanteComponent } from './tarefa-participante.component';

describe('TarefaParticipanteComponent', () => {
  let component: TarefaParticipanteComponent;
  let fixture: ComponentFixture<TarefaParticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
