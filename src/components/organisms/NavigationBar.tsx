"use client";

import { ActionIcon, Paper } from "@mantine/core";
import { usePathname } from "next/navigation";

import Link from "next/link";
import NAVIGATION_LINKS from "@/utils/navigation-links";

function NavigationBar() {

    const pathname = usePathname();

    return (
        <header className="w-full p-2 fixed left-0 bottom-0">
            <Paper
                withBorder
                shadow="md"
                component="nav"
                className="p-2 flex justify-between">
                {NAVIGATION_LINKS.map(nl => {

                    const isActive =
                        (nl.strictMatcher && pathname === nl.pathname) ||
                        (!nl.strictMatcher && pathname.startsWith(nl.pathname));

                    return (
                        <ActionIcon
                            size="xl"
                            component={Link}
                            href={nl.pathname}
                            key={nl.pathname}
                            aria-label={nl.name}
                            aria-current={isActive}
                            variant={isActive ? "light" : undefined}>
                            {nl.icon(32)}
                        </ActionIcon>
                    );
                })}
            </Paper>
        </header>
    );
}

export default NavigationBar;