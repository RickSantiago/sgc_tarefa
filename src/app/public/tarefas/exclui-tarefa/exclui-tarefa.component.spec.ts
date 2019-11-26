import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluiTarefaComponent } from './exclui-tarefa.component';

describe('ExcluiTarefaComponent', () => {
  let component: ExcluiTarefaComponent;
  let fixture: ComponentFixture<ExcluiTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcluiTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluiTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
