import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTarefaComponent } from './criar-tarefa.component';

describe('CriarTarefaComponent', () => {
  let component: CriarTarefaComponent;
  let fixture: ComponentFixture<CriarTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
