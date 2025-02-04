// ... existing imports
import { configureStore } from '@reduxjs/toolkit';
// ... other imports

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

// ... rest of the file