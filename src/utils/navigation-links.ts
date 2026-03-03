"use client";

import { createElement, ReactNode } from "react";
import { IconCalendarEvent, IconHome, IconUser } from "@tabler/icons-react";
import { t } from "i18next";

type NavigationLink = {
    pathname: string;
    icon: (size: number) => ReactNode;
    name: string;
    strictMatcher?: boolean;
};

const NAVIGATION_LINKS: NavigationLink[] = [
    {
        pathname: "/",
        icon: size => createElement(IconHome, { size }),
        name: t("common.Home"),
        strictMatcher: true
    },
    {
        pathname: "/appointments",
        icon: size => createElement(IconCalendarEvent, { size }),
        name: t("appointments.appointments")
    },
    {
        pathname: "/my-profile",
        icon: size => createElement(IconUser, { size }),
        name: t("appointments.appointments")
    }
];

export default NAVIGATION_LINKS;