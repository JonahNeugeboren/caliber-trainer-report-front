import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentScoresAccordingToBatchComponent } from './assessment-scores-according-to-batch.component';

describe('AssessmentScoresAccordingToBatchComponent', () => {
  let component: AssessmentScoresAccordingToBatchComponent;
  let fixture: ComponentFixture<AssessmentScoresAccordingToBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentScoresAccordingToBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentScoresAccordingToBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
