import { HttpContextToken } from '@angular/common/http';

// The function () => false sets the default value (meaning: apply interceptor by default)
export const BYPASS_INTERCEPTOR = new HttpContextToken<boolean>(() => false);