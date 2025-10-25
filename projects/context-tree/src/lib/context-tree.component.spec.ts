import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextTreeComponent } from './context-tree.component';

describe('ContextTreeComponent', () => {
  let component: ContextTreeComponent;
  let fixture: ComponentFixture<ContextTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
