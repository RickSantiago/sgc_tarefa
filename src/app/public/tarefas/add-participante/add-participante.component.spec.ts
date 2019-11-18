import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipanteComponent } from './add-participante.component';

describe('AddParticipanteComponent', () => {
  let component: AddParticipanteComponent;
  let fixture: ComponentFixture<AddParticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
