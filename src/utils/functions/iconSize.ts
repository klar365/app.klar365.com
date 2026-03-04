import { MantineSize } from "@mantine/core";

function iconSize(size: MantineSize) {
    switch (size) {
        case "xs": return 12;
        case "sm": return 14;
        case "md": return 16;
        case "lg": return 18;
        case "xl": return 20;
    }
}

export default iconSize;