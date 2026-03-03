"use client";

import ParentProps from "@/types/common/ParentProps";

import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@/utils/i18n";

const theme = createTheme({});

const Providers = ({ children }: ParentProps) => (
    <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications />
        {children}
    </MantineProvider>
);

export default Providers;