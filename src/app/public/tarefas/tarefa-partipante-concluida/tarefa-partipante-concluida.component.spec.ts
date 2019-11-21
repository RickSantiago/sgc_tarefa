import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaPartipanteConcluidaComponent } from './tarefa-partipante-concluida.component';

describe('TarefaPartipanteConcluidaComponent', () => {
  let component: TarefaPartipanteConcluidaComponent;
  let fixture: ComponentFixture<TarefaPartipanteConcluidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaPartipanteConcluidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaPartipanteConcluidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
