import { Injectable } from '@angular/core';
import { Role } from '../enums/Role';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {

    // Role is now an Enum type
    currentUserRole: Role = Role.Teacher; 
    currentUserId: string = 'teacher-123'; 

    // Updated return type to Role enum
    getRole(): Role {
        return this.currentUserRole;
    }

    getUserId(): string {
        return this.currentUserId;
    }
  constructor() { }
}
