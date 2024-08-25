import { GenericState, Meta } from "@/stores/types";
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { get } from "lodash";

import { ERROR, PENDING, SUCCESS } from "@/constants/redux-constants";

import { getErrorString } from "./object-utils";

/**
 * buildGenericInitialState  - Builds initial state for a set of constants
 *                             (loading, errors, messages)
 *
 * @param {Array} constants  Array of constants to build state around
 * @returns {Object}
 */
export function buildGenericInitialState(constants: string[]): GenericState {
    return {
        messages: constants.reduce(
            (retObj: { [x: string]: string }, constant) => {
                retObj[constant] = "";
                return retObj;
            },
            {}
        ),
        errors: constants.reduce((retObj: { [x: string]: any[] }, constant) => {
            retObj[constant] = [];
            return retObj;
        }, {}),
        loading: constants.reduce(
            (retObj: { [x: string]: boolean }, constant) => {
                retObj[constant] = false;
                return retObj;
            },
            {}
        ),
    };
}

/**
 * updateStore  - Returns an object containing updated state. This helper
 *                builds generic state (messages, errors, loading)
 *
 * @param {Object} state          Current state of the store
 * @param {Object} action         Redux action for the store to respond to
 * @param {Object} [extraValues]  Any additional state to be assigned
 * @returns {Object}
 */
export const updateStore = <S extends GenericState>(
    state: S,
    action: PayloadAction<any, string, Meta> | PayloadAction<any>,
    extraValues?: { [x in keyof S]?: any }
): S => {
    const { type = "", payload = {} } = action;
    const meta = "meta" in action ? action.meta : { status: SUCCESS };
    switch (meta.status) {
        case SUCCESS:
            return {
                ...state,
                ...extraValues,
                messages: {
                    ...state.messages,
                    [type]: get(payload, "message"),
                },
                loading: { ...state.loading, [type]: false },
                errors: { ...state.errors, [type]: [] },
            };
        case ERROR:
            return {
                ...state,
                messages: { ...state.messages, [type]: "" },
                loading: { ...state.loading, [type]: false },
                errors: {
                    ...state.errors,
                    [type]:
                        get(payload, "data.errors") ||
                        get(payload, "errors") ||
                        action.payload ||
                        [],
                },
            };
        case PENDING:
        default:
            return {
                ...state,
                messages: { ...state.messages, [type]: "" },
                loading: { ...state.loading, [type]: true },
                errors: { ...state.errors, [type]: [] },
            };
    }
};

/**
 * handleError  - Dispatches error properly to Redux stores
 *
 * @param {Function} dispatch Redux dispatch function
 * @param {Object}   error    Error container
 * @param {String}   type     Action type constant for error received
 */
export const handleError = async (
    dispatch: Dispatch,
    error: Error | AxiosError,
    type: string
) => {
    let errors: string[] = [];
    if (axios.isAxiosError(error)) {
        errors = error?.response
            ? [error.response?.data?.Message ?? error.response?.statusText]
            : [error.message];
    }
    if (errors.length === 0) {
        errors = [getErrorString(error)];
    }
    const foundError = errors;
    return dispatch({
        type,
        payload: foundError,
        meta: { status: ERROR },
    });
};

/**
 * selectGenericsOfActionType  - get the common state data from state based on action type
 *
 * @param {S extends GenericState} state current State of the store
 * @param {String} type     Action type constant
 */
export const selectGenericsOfActionType = <S extends GenericState>(
    state: S,
    type: string
) => {
    return {
        messages: state.messages[type],
        loading: state.loading[type],
        errors: state.errors[type],
    };
};
