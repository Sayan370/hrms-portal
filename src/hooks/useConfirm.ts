import { useConfirmationContext } from "@/contexts/ConfirmationContext";

const useConfirm = () => {
    const { confirm } = useConfirmationContext();
    return confirm;
};

export default useConfirm;
