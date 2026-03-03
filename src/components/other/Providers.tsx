"use client";

import ParentProps from "@/types/common/ParentProps";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { generateColors } from "@mantine/colors-generator";
import { Inter } from "next/font/google";

import "@/utils/i18n";
import { SessionContextProvider } from "@/hooks/useSession";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
    colors: {
        "_blue": generateColors("#1a54c7")
    },
    primaryColor: "_blue",
    fontFamily: inter.style.fontFamily,
    components: {
        ActionIcon: {
            defaultProps: {
                variant: "subtle"
            }
        }
    }
});

const Providers = ({ children }: ParentProps) => (
    <MantineProvider theme={theme} defaultColorScheme="auto">
        <SessionContextProvider>
            <Notifications />
            {children}
        </SessionContextProvider>
    </MantineProvider>
);

export default Providers;