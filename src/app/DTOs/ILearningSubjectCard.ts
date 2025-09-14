export interface ILearningSubjectCard {
  id: string;
  title: string;
  description: string;
  duration: string;
  teachers: string[]; // list of teacher image URLs
  coverImage: string; // course cover image
  altText: string; // accessibility text for cover image
}