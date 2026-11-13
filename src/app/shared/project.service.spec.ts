import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';

describe('Project selection', () => {
  it('selects the correct gallery and clears details on close', () => {
    const service = TestBed.inject(ProjectService);
    service.open('medcare');
    expect(service.selected()?.name).toBe('Medcare');
    expect(service.selected()?.gallery).toHaveLength(3);
    service.close();
    expect(service.selected()).toBeNull();
    service.open('unknown-project');
    expect(service.selected()).toBeNull();
  });
});
