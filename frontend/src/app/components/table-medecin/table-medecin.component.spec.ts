import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMedecinComponent } from './table-medecin.component';

describe('TableMedecinComponent', () => {
  let component: TableMedecinComponent;
  let fixture: ComponentFixture<TableMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMedecinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
