import { SalaryData } from "@/models/responses/salary-data"
import { useState } from "react";

const useSalaryBreakdown = (data: SalaryData) => {
    const [open, setOpenState] = useState(false);
    const toggleCollapse = () => { setOpenState(state => !state) }
    return { open, toggleCollapse }
}

export default useSalaryBreakdown;