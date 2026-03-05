import { t } from "i18next";
import { Button, ButtonProps, MantineSize } from "@mantine/core";
import { IconChevronLeft, IconLogin } from "@tabler/icons-react";
import { MouseEventHandler, useMemo } from "react";

import getIconSize from "@/utils/functions/getIconSize";

type FormActionsProps = {
    size?: MantineSize;
    loading?: ButtonProps["loading"];

    onBackClick?: MouseEventHandler;

    submitLabel?: string;
    backLabel?: string;
};

function FormActions({
    size,
    loading,

    onBackClick,

    submitLabel = t("common.submit"),
    backLabel = t("common.goBack")
}: Readonly<FormActionsProps>) {

    const iconSize = useMemo(() => size && getIconSize(size), [size]);

    return (
        <div className="mt-6 flex flex-col gap-2 md:flex-row-reverse md:justify-start">
            <Button
                loading={loading}
                type="submit"
                size={size}
                leftSection={<IconLogin size={iconSize} />}>
                {submitLabel}
            </Button>

            {onBackClick ? (
                <Button
                    loading={loading}
                    onClick={onBackClick}
                    variant="light"
                    size={size}
                    leftSection={<IconChevronLeft size={iconSize} />}>
                    {backLabel}
                </Button>
            ) : null}
        </div>
    );
}

export default FormActions;