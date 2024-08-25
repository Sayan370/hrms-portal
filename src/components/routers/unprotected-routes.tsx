import * as React from "react";
import { useOutlet } from "react-router-dom";

const UnprotectedRoute: React.FC = () => {
    const outlet = useOutlet();

    return outlet;
};

export default UnprotectedRoute;
