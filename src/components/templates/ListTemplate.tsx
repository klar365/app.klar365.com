import { ReactNode } from "react";
import { Paper, Text } from "@mantine/core";

type ListTemplateProps = {
    heading?: string;
    filters?: ReactNode;
    list: ReactNode;
};

function ListTemplate({ heading, filters, list }: Readonly<ListTemplateProps>) {
    return (
        <div>
            {heading ? (
                <Text
                    size="xl"
                    component="h1"
                    className="ml-2 mt-2">
                    {heading}
                </Text>
            ) : null}

            {filters ? (
                <Paper
                    withBorder
                    shadow="md"
                    className="m-2 mb-0 p-2">
                    {filters}
                </Paper>
            ) : null}

            <ol className="p-2 flex flex-col gap-2">
                {list}
            </ol>
        </div>
    );
}

export default ListTemplate;