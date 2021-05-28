
 import * as actionTypes from './actionTypes';
export const saveCurrencyHistory = (history) => {
    return {
        type: actionTypes.SAVE_CURRENCY_VALUE, //type
        history: history //payload
    }
};