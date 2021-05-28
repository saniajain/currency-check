import * as actionTypes from '../actions/actionTypes';

//will take action and update the state
export default (state = [], action) => {
        switch(action.type){
            case actionTypes.SAVE_CURRENCY_VALUE:
                return[
                    ...state,
                    Object.assign({}, action.history)
                ];
            default:
                return state;
        }
}