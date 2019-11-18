import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheTarefaComponent } from './detalhe-tarefa.component';

describe('DetalheTarefaComponent', () => {
  let component: DetalheTarefaComponent;
  let fixture: ComponentFixture<DetalheTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
