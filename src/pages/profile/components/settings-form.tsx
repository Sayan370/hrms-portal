import { AppSwitch } from "@/components/form"
import useSettingsForm from "../hooks/useSettingsForm";

const SettingsForm = () => {
    const { formSchema, toggleOnSidebarCollapseSwitch } = useSettingsForm();
    return <div className="flex flex-col gap-1 justify-start">
        <AppSwitch
            onChange={toggleOnSidebarCollapseSwitch}
            {
            ...formSchema.autoCollapseSidebarOnSmallerScreen
            }
        />
    </div>
}

export default SettingsForm;