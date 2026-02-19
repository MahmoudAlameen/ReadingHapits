export enum AssessmentStatus {
  New = 1,
  InReview = 2,
  Approved = 3,
  Rejected = 4,
  Published = 5,
  Finished = 6
}

export enum AssessmentType
{
    PISA = 1,
    PIRLS = 2,
    TIMMS = 3,
    Ordinary = 4
}

export enum InternationalAssessmentSubject
{
  Math = 1,
  Science = 2,
  Arabic = 3,
  English = 4
}

export const AssessmentTypeSubjectsMap: Record<
  AssessmentType,
  InternationalAssessmentSubject[]
> = {
  [AssessmentType.PISA]: [
    InternationalAssessmentSubject.Arabic,
    InternationalAssessmentSubject.English,
    InternationalAssessmentSubject.Science,
    InternationalAssessmentSubject.Math
  ],

  [AssessmentType.PIRLS]: [
    InternationalAssessmentSubject.Arabic,
    InternationalAssessmentSubject.English
  ],

  [AssessmentType.TIMMS]: [
    InternationalAssessmentSubject.Math,
    InternationalAssessmentSubject.Science
  ],

  [AssessmentType.Ordinary]: []
};
