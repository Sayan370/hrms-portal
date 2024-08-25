// Note: These routes are different from the open routes
// These routes can't be open if the user is authed.
export const NonAuthedRoutes = {
    login: `/login`,
    register: `/register`,
};

export const AuthedRoutes = {
    home: `/dashboard`,
    profile: `/profile`,
    invoices: `/process/invoices`,
    receipts: `/process/receipts`,
    customers: `/home/customers`,
    buildings: `/home/profit-centers/buildings`,
    customerBuildings: `/home/buildings`,
    properties: `/home/profit-centers/properties`,
    customerProperties: `/home/properties`,
    ledger: `/reports/customers-ledger`,
};

export const PublicRoutes = {
    billing: "/account/billing",
};
