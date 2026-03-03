import { useMediaQuery } from "@mantine/hooks";

function useMd() {
    return useMediaQuery("(min-width: 768px)");
}

export default useMd;