import { LearningResourceType } from "../enums/learning-resources.enums";
import { ResourceContentType } from "../enums/resource-content-type";

export interface ILearningResource { 
    id: string;
    nameAr: string; 
    nameEn: string; 
    resourceType: LearningResourceType; 
    contentResourseType: ResourceContentType; 
    coverUrl?: string; 
    fileURL?: string; 
    learningSubjectId: string;
    gradeId: string;
}