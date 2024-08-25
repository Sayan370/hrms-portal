import { Link } from "react-router-dom";

import PageWithHeaderFooter from "@/layouts/page-with-header-footer";
import { AppLink } from "@/components/form";
import { Avatar, Chip } from "@mui/material";
import { getNameInitials, getRole } from "@/utils/object-utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/tabs";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import { useProfile } from "./hooks/useProfile";
import ChangePasswordForm from "./components/change-password-form";
import SettingsForm from "./components/settings-form";
import OverviewForm from "./components/overview-form";

function ProfilePage() {
    const { user } = useProfile();
    return (
        <PageWithHeaderFooter>
            <div className="flex h-full flex-col gap-4">
                <div className="flex flex-col items-center">
                    <Avatar sx={{ width: 100, height: 100, fontSize: "3rem" }}>{getNameInitials(`${user?.given_name ?? ""} ${user?.family_name ?? ""}`, true)}</Avatar>
                    <span className="text-2xl p:text-3xl mt-4">{`${user?.given_name ?? ""} ${user?.family_name ?? ""}`}</span>
                    {user?.role && <Chip label={getRole(user?.role)} size="small" className="font-bold mt-1" />}
                </div>
                <TabGroup
                    defaultValue={0}
                    orientation="horizontal"
                    className="grow relative"
                >
                    <TabList
                        // scrollButtons
                        variant="standard"
                        centered
                    >
                        <Tab
                            label="Personal Info"
                            value={0}
                        />
                        <Tab
                            label="Password"
                            value={1}
                        />
                        <Tab
                            label="Settings"
                            value={2}
                        />
                    </TabList>
                    <TabPanels>
                        <TabPanel value={0} className="px-2">
                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-lg">
                                <div className="w-full p:w-96 mx-auto mt-0 p:mt-10 p-4">
                                    <h3 className="text-md font-normal">Overview</h3>
                                    <OverviewForm />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={1} className="px-2">
                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-lg">
                                <div className="w-full p:w-96 mx-auto mt-0 p:mt-10 p-4">
                                    <h3 className="text-md font-normal">Change Your Password</h3>
                                    <ChangePasswordForm />
                                    <div className="flex flex-row items-center justify-between mt-4">
                                        <span className="text-md text-left">
                                            Forgot your password?
                                        </span>
                                        <AppLink
                                            component={Link}
                                            className="text-right"
                                            to="/reset-password">
                                            Reset password via email
                                        </AppLink>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={2} className="px-2">
                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-lg">
                                <div className="w-full p:w-96 mx-auto mt-0 p:mt-10 p-4">
                                    <h3 className="text-md font-normal">Settings</h3>
                                    <SettingsForm />
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </PageWithHeaderFooter>
    );
}

export default ProfilePage;
