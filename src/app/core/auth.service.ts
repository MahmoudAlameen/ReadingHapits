import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IUserClaims } from '../enums/users.enums';
import { SessionStorageService } from './SessionStorageService';
import { SessionStorageKeysService } from './SessionStorageKeysService';
import { logedUser } from 'src/interfaces/logedUser';
import { APIResponseModel } from '../classes/APIResponse';
import { UserLoginResult } from '../DTOs/UserLoginResult';
import { APIService } from './API.Service';
import { HttpClient } from '@angular/common/http';
import { Role } from '../enums/Role';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private helper = new JwtHelperService();

  // 1. BehaviorSubject to hold the current user data state
  private currentUserSubject: BehaviorSubject<IUserClaims | null>;
  public currentUser$: Observable<IUserClaims | null>;
  constructor(
    private sessionStorageService: SessionStorageService,
    private sessionStorageKeys: SessionStorageKeysService,
    private api : APIService,
    private http: HttpClient
  ) 
  {
        // Initialize the subject by checking for an existing token on app load
    const initialUser = this.decodeTokenAndGetUser();
    this.currentUserSubject = new BehaviorSubject<IUserClaims | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

  }

    // Called after a successful login (or on app initialization)
  public saveToken(token: string): void {
    this.sessionStorageService.setItem(this.sessionStorageKeys.jwt_token, token);
    const user = this.decodeTokenAndGetUser();
    
    // Publish the new user data to all subscribers
    this.currentUserSubject.next(user);
  }
private decodeTokenAndGetUser(): IUserClaims | null {
  const token = sessionStorage.getItem(this.sessionStorageKeys.jwt_token);

  if (token && !this.helper.isTokenExpired(token)) {
    const decodedToken = this.helper.decodeToken(token);

    // 1. Normalize roles (string | string[] → string[])
    const rolesRaw = decodedToken.roles;
    let roles: string[] = [];
    if (Array.isArray(rolesRaw)) {
      roles = rolesRaw;
    } else if (rolesRaw) {
      roles = [rolesRaw];
    }

    // 2. Safely convert string "True"/"False" to boolean
    // We convert to string, lowercase it, and compare to 'true'
    const activatedRaw = decodedToken.isAccountActivatedAsMember;
    const isActivated = String(activatedRaw).toLowerCase() === 'true';

    return {
      userId: decodedToken.sub || decodedToken.userId,
      email: decodedToken.email || decodedToken.emailaddress,
      username: decodedToken.name || decodedToken.username,
      roles: roles,
      exp: decodedToken.exp,
      mustChangePassword: String(decodedToken.mustChangePassword).toLowerCase() === 'true',
      isAccountActivatedAsMember: isActivated,
    } as IUserClaims;
  }

  return null;
}

  LoginUser(loginUser:logedUser):Observable<APIResponseModel<UserLoginResult>>
  {
      return this.http.post<APIResponseModel<UserLoginResult>>(this.api.UserLogin,loginUser).pipe(
                  tap(response => {
        if (response.isValid && response.model && response.model.token) {
          // BEST PRACTICE: Store the JWT token securely
          this.saveToken(response.model.token);
          // You might also want to store the expiry date or user profile data
          // localStorage.setItem('user_expiry', response.model.expireDate.toString());
        }
      }))
  }
  
  logout(): void {
    // Remove the token and other user data

    // Navigate away or reload the page
  }
  
  LogoutUser(): Observable<APIResponseModel<Boolean>>
  {
    this.sessionStorageService.removeKey(this.sessionStorageKeys.jwt_token)
    this.currentUserSubject.next(null); 
     var result : APIResponseModel<boolean> = 
     {
         isValid: true,
         model: true,
         errorMessage : ''
     }
     return of(result)
  }
   // Helper to check login status
  public isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
    // Check if token exists and optionally check if it's expired
  }
  
  public getCurrentUserSnapshot(): IUserClaims | null {
    return this.currentUserSubject.value;
  }

    handleUnauthorized(): void {
    // 1. Clear any local or session storage (e.g., JWT token, user state)
    // Example: localStorage.removeItem('authToken');
    
    // 2. Clear any active user session in your state management (e.g., NGRX, Signals, Context)
    // this.userStore.clearUser();

    // 3. Navigate the user to the login page
  }

    public IsUserIsTeacher(): boolean
  {
    return this.getCurrentUserSnapshot()?.roles?.includes(Role[Role.Teacher]) || false;
  }
  public IsuserIsSchoolPrincipal(): boolean
  {
        return this.getCurrentUserSnapshot()?.roles?.includes(Role[Role.SchoolPrincipal]) || false;
  }

  public IsUserIsTeacherOrSchoolPrincipal(): boolean
  {
    return this.IsUserIsTeacher() || this.IsuserIsSchoolPrincipal();
  }
  public IsuserIsStudent(): boolean
  {
    return this.getCurrentUserSnapshot()?.roles?.includes(Role[Role.Student]) || false;
  }
  // Example placeholder function for token retrieval
  // getAuthToken(): string | null {
  //   return localStorage.getItem('authToken');
  // }
}
