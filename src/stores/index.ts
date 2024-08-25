import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authenticationModule from "./modules/authentication";
import uiModule from "./modules/ui";

// import reportsModule from './modules/reports';

const rootReducer = combineReducers({
    authentication: authenticationModule.reducer,
    ui: uiModule.reducer,
});

const initStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    });
export default initStore;
export type AppStore = ReturnType<typeof rootReducer>;

// export type AppDispatch = ReturnType<typeof createStore>
