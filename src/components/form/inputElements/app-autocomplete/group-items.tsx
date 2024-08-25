import { AutocompleteRenderGroupParams, darken, lighten, styled } from "@mui/material";

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
        theme.palette.mode === 'light'
            ? lighten(theme.palette.primary.light, 0.85)
            : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
    padding: 0,
});

export const AutocompleteGroup = (params: AutocompleteRenderGroupParams) => (<li key={params.key}>
    <GroupHeader>{params.group}</GroupHeader>
    <GroupItems>{params.children}</GroupItems>
</li>)