import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { logout } from '../modules/Auth/auth.slice';

export const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as { status?: number };
    
    if (payload.status === 401) {
      api.dispatch(logout());
    }
  }

  return next(action);
};
