import { selectUser } from "@/stores/modules/authentication";
import { useSelector } from "react-redux"

export const useProfile = () => {
    const { user } = useSelector(selectUser);
    return { user }
}
