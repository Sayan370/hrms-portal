// import { Action } from "@reduxjs/toolkit";

import { ReduxStoreState } from "@/models/types";

export interface GenericState {
    messages: { [x: string]: string };
    loading: { [x: string]: boolean };
    errors: { [x: string]: any[] };
}

export type Meta = {
    status?: ReduxStoreState;
    [x: string]: string | undefined;
};
