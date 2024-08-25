import httpService from "@/services/http-service";
import { Meta } from "@/stores/types";
import { Dispatch } from "@reduxjs/toolkit";

import { PENDING, SUCCESS } from "@/constants/redux-constants";

import { config } from "./app-config";

/**
 * logError  - Log error without UI display
 * @param {Object} error      Error object caught in catch block
 * @param {String} type       Action type that caused error
 *
 * @returns {Promise}
 */
export const logError = (error: any, type: string) => {
    if (config.env.MODE === "development") {
        console.error(`Error type: ${type}.`);
        console.error(error);
    }

    const errorMessage = error && error.response ? error.response.data : error;

    return Promise.reject(errorMessage);
};

/**
 * dispatchPost - Generic action to make a POST request with axios
 * @param {Function} dispatch     React-redux's dispatch function
 * @param {String} type           Action type to be dispatched
 * @param {String} endpoint       Api endpoint to hit (e.g., '/auth/login')
 * @param {String} endpoint       Api endpoint to hit (e.g., '/auth/login')
 * @param {Object} data           Data to be posted to the api
 *
 * @returns {Promise}
 */
export const dispatchPost = async (
    dispatch: Dispatch,
    type: string,
    endpoint: string,
    data?: Object,
    dispatchSuccess: boolean = true
) => {
    try {
        dispatch({
            type,
            meta: { status: PENDING },
        });

        const response = await httpService.post(endpoint, data);

        if (dispatchSuccess) {
            dispatch({
                type,
                meta: { status: SUCCESS },
                payload: response.data,
            });
        }

        return response;
    } catch (err) {
        return logError(err, type);
    }
};

/**
 * dispatchPut - Generic action to make a PUT request with axios
 * @param {Function} dispatch     React-redux's dispatch function
 * @param {String} type           Action type to be dispatched
 * @param {String} endpoint       Api endpoint to hit (e.g., '/user/:id')
 * @param {Object} data           Data to be posted to the api
 * @param {Boolean} requiresAuth  Whether or not request needs to be authenticated
 *
 * @returns {Promise}
 */
export const dispatchPut = async (
    dispatch: Dispatch,
    type: string,
    endpoint: string,
    data: Object,
    dispatchSuccess: boolean = false
) => {
    try {
        dispatch({
            type,
            meta: { status: PENDING },
        });

        const response = await httpService.put(endpoint, data);

        if (dispatchSuccess) {
            dispatch({
                type,
                meta: { status: SUCCESS },
                payload: response.data,
            });
        }

        return response;
    } catch (err) {
        return logError(err, type);
    }
};

/**
 * dispatchGet - Generic action to make a GET request with axios
 * @param {Function} dispatch     React-redux's dispatch function
 * @param {String} type           Action type to be dispatched
 * @param {String} endpoint       Api endpoint to hit (e.g., '/user')
 * @param {Boolean} requiresAuth  Whether or not request needs to be authenticated
 *
 * @returns {Promise}
 */
export const dispatchGet = async (
    dispatch: Dispatch,
    type: string,
    endpoint: string,
    params: Object,
    dispatchSuccess: boolean = false
) => {
    try {
        dispatch({
            type,
            meta: { status: PENDING },
        });

        const response = await httpService.get(endpoint, {
            params,
        });

        if (dispatchSuccess) {
            dispatch({
                type,
                meta: { status: SUCCESS },
                payload: response.data,
            });
        }
        return response;
    } catch (err) {
        return logError(err, type);
    }
};

/**
 * dispatchDel - Generic action to make a DELETE request with axios
 * @param {Function} dispatch     React-redux's dispatch function
 * @param {String} type           Action type to be dispatched
 * @param {String} endpoint       Api endpoint to hit (e.g., '/user/:id')
 * @returns {Promise}
 */
export const dispatchDel = async (
    dispatch: Dispatch,
    type: string,
    endpoint: string,
    data: Object,
    dispatchSuccess: boolean = false
) => {
    try {
        dispatch({
            type,
            meta: { status: PENDING },
        });

        const response = await httpService.delete(endpoint, data);

        if (dispatchSuccess) {
            dispatch({
                type,
                meta: { status: SUCCESS },
                payload: response.data,
            });
        }
        return response;
    } catch (err) {
        return logError(err, type);
    }
};

export const createGenericAction = (type: string, payload: any, meta: Meta) => {
    return { type, payload, meta };
};
