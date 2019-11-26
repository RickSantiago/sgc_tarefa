import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaTarefaComponent } from './edita-tarefa.component';

describe('EditaTarefaComponent', () => {
  let component: EditaTarefaComponent;
  let fixture: ComponentFixture<EditaTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
