import {
    Children,
    isValidElement,
    MouseEvent,
    PropsWithChildren,
    ReactElement,
    useMemo,
} from "react";
import { MoreHoriz } from "@mui/icons-material";
import {
    Card,
    CardActions,
    CardContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import clsx from "clsx";
import flattenChildren from "react-keyed-flatten-children";

import { AppButton } from "../form";
import Popup, { PopupAnchor } from "../popup";

interface MenuItem<TItem extends string | number> {
    title: string;
    value: TItem;
    icon: ReactElement;
}

interface InfoCardProps<TItem extends string | number> {
    title?: string;
    className?: string;
    menu?: MenuItem<TItem>[];
    classes?: {
        root?: string;
        title?: string;
        content?: string;
    };
    onMenuItemClick?: (value: TItem) => void;
}

const InfoCard = <TItem extends string | number>({
    children,
    title,
    className,
    classes = {},
    menu,
    onMenuItemClick,
    ...restProps
}: PropsWithChildren<InfoCardProps<TItem>>) => {
    const handleMenuClick = (value: TItem) => (evt: MouseEvent<HTMLLIElement>) => {
        if (onMenuItemClick) {
            onMenuItemClick(value);
        }
    }
    const generate = (menu: MenuItem<TItem>[]) =>
        menu.map((r, i) => (
            <ListItem disablePadding onClick={handleMenuClick(r.value)} key={i}>
                <ListItemButton>
                    <ListItemIcon>{r.icon}</ListItemIcon>
                    <ListItemText primary={r.title} />
                </ListItemButton>
            </ListItem>
        ));

    const actions = useMemo(() => (flattenChildren(children, 2).filter((child) => {
        const item = child as ReactElement<PropsWithChildren>;

        return item?.type === Actions;
    })), [children]);

    return (
        <Card variant="outlined" className={clsx("!rounded-xl", classes?.root ?? className)}>
            <CardContent className={clsx(classes?.content)}>
                <div
                    className={clsx(
                        "flex flex-row items-start justify-between",
                        classes?.title
                    )}>
                    {
                        title && (
                            <Typography
                                className={clsx(classes?.title)}
                                sx={{ fontSize: 20 }}
                                color="text.secondary"
                                gutterBottom>
                                {title}
                            </Typography>
                        )
                    }
                    {menu && (
                        <Popup>
                            <PopupAnchor>
                                <AppButton variant="icon" size="small">
                                    <MoreHoriz fontSize="small" />
                                </AppButton>
                            </PopupAnchor>
                            <List dense>{generate(menu)}</List>
                        </Popup>
                    )}
                </div>
                {flattenChildren(children, 2).filter((child) => {
                    const item = child as ReactElement<PropsWithChildren>;

                    return item?.type !== Actions;
                })}
            </CardContent>
            {
                !!actions.length &&
                <CardActions>
                    {actions}
                </CardActions>
            }
        </Card>
    );
};

interface ActionsProps { }

const Actions = ({ children }: PropsWithChildren<ActionsProps>) => {
    return (
        <>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return null;

                return child;
            })}
        </>
    );
};

export const InfoCardActions = Actions;

export default InfoCard;
