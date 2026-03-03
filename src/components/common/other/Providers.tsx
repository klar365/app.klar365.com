"use client";

import ParentProps from "@/types/common/ParentProps";

import { createTheme, MantineProvider } from "@mantine/core";

import "@/utils/i18n";

const theme = createTheme({});

const Providers = ({ children }: ParentProps) => (
    <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
    </MantineProvider>
);

export default Providers;