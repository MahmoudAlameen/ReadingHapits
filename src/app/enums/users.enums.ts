export interface IUserClaims {
  userId: string;
  email: string;
  username: string;
  exp: number; // Expiration time
  // Add other claims you included on the backend
}