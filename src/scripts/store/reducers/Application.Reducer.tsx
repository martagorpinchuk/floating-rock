
import { APP_INITED } from '../../actions/Application.Actions';

//

export interface IApplicationState {
    inited:     boolean;
};

export const applicationInitialState: IApplicationState = {
    inited:     false
};

export const application = ( state = applicationInitialState, action ) => {

    switch ( action.type ) {

        case APP_INITED: {

            return {
                ...state,
                inited:     true
            };

        };

        default: {

            return { ...state };

        };

    }

};
