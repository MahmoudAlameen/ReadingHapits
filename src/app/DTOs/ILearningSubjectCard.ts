export interface ILearningSubjectCard {
  id: string;
  nameEn: string;
  nameAr : string;
  descriptionEn?: string;
  descriptionAr?: string;
  assignedTeachers: ITeacherAvatar[]; // list of teacher image URLs
  coverUrl?: string; // course cover image
  teachersCount : number
}

export interface ITeacherAvatar
{
  name : string,
  avatarUrl? : string 
}