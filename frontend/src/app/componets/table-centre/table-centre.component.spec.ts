import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCentreComponent } from './table-centre.component';

describe('TableCentreComponent', () => {
  let component: TableCentreComponent;
  let fixture: ComponentFixture<TableCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCentreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
