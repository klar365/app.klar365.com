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
        "_purple": generateColors("#504c97")
    },
    primaryColor: "_purple",
    primaryShade: 7,
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