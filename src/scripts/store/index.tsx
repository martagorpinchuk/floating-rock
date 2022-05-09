
import { createStore, combineReducers } from 'redux';
import { application, applicationInitialState, IApplicationState } from './reducers/application.reducer';

//

const initialState = {
    application: applicationInitialState
};

//

export const store = createStore( combineReducers({
    application
}), initialState );

//

interface IAppState {
    application: IApplicationState;
};

declare module 'react-redux' {
    interface DefaultRootState extends IAppState {}
};
