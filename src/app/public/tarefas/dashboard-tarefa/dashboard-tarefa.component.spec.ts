import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTarefaComponent } from './dashboard-tarefa.component';

describe('DashboardTarefaComponent', () => {
  let component: DashboardTarefaComponent;
  let fixture: ComponentFixture<DashboardTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
