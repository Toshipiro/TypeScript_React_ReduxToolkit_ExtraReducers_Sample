import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../features/pet/petSlice';

/**
 * Root Store which has child reducers in feature directory.
 */
export const store = configureStore({
  reducer: {
    /** pet slice reducer */
    pet: petReducer,
    /** Add new slice reducers below. */
  },
});

/** Root State to access child slice store. */
export type RootState = ReturnType<typeof store.getState>;

/** Root dispatch to access child slice action. */
export type AppDispatch = typeof store.dispatch;
