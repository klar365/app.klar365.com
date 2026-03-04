import { ReactNode } from "react";
import { MantineSize, Text, Tooltip } from "@mantine/core";

export type Entry = {
    label: string;
    name: ReactNode;
    value: ReactNode;
};

type DataTableProps = {
    size?: MantineSize;
    entries: Entry[];
};

function DataTable({ size = "md", entries }: Readonly<DataTableProps>) {
    return (
        <dl className="flex flex-col gap-1">
            {entries.map(e => (
                <div className="flex items-center gap-1" key={e.label}>
                    <Tooltip label={e.label}>
                        <Text
                            component="dt"
                            size={size}
                            aria-describedby={undefined}>
                            <div aria-hidden>{e.name}</div>

                            <span className="sr-only">
                                {e.label}
                            </span>
                        </Text>
                    </Tooltip>

                    <Text component="dd" size={size}>
                        {e.value}
                    </Text>
                </div>
            ))}
        </dl>
    );
}

export default DataTable;