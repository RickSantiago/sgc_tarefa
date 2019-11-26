import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluiAtividadeComponent } from './exclui-atividade.component';

describe('ExcluiAtividadeComponent', () => {
  let component: ExcluiAtividadeComponent;
  let fixture: ComponentFixture<ExcluiAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcluiAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluiAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
