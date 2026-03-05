import DataTable from "@/components/organisms/DataTable";
import { ComponentProps } from "react";
import Link from "next/link";
import { Paper, Text } from "@mantine/core";

type DataCardProps = {
    title?: string;
    href: string;
} & ComponentProps<typeof DataTable>;

function DataCard({
    title,
    href,
    ...restProps
}: Readonly<DataCardProps>) {
    return (
        <Paper
            withBorder
            shadow="md"
            component={Link}
            href={href}
            className="p-4 mantine-focus-auto"
            tabIndex={0}>
            {title ? (
                <Text size="xl" component="span">
                    {title}
                </Text>
            ) : null}

            <DataTable {...restProps} />
        </Paper>
    );
}

export default DataCard;