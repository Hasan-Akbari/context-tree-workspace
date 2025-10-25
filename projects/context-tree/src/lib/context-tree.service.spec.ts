import { TestBed } from '@angular/core/testing';

import { ContextTreeService } from './context-tree.service';

describe('ContextTreeService', () => {
  let service: ContextTreeService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
