export interface IUserClaims {
  userId: string;
  email: string;
  username: string;
  exp: number; // Expiration time
  mustChangePassword: boolean;
  roles: string[]; // Array of user roles
  isAccountActivatedAsMember: boolean
  // Add other claims you included on the backend
}