import {combineReducers} from "redux";
import DashboardReducer from "./DashboardReducer";

const rootReducer = combineReducers({
  DashboardPage: DashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;