"use client";

import { TransformedValues, useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, TextInput } from "@mantine/core";
import { t } from "i18next";
import { IconArrowBack, IconChevronLeft, IconLogin } from "@tabler/icons-react";

import z from "zod";
import useMd from "@/hooks/isMd";

type SigninFormProps = {
    onBackClick?: () => unknown;
};

function SigninForm({ onBackClick }: Readonly<SigninFormProps>) {

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: ""
        },
        validate: zodResolver(z.object({
            firstName: z.string(),
            lastName: z.string(),
            emailAddress: z.email(),
            password: z.string()
        }))
    });

    function onSubmit(values: TransformedValues<typeof form>) {}

    const isMd = useMd();

    const iconSize = isMd ? 18 : 24;
    const size = isMd ? undefined : "lg";

    return (
        <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 md:flex-row">
                <TextInput
                    required
                    label={t("common.FirstName")}
                    className="w-full"
                    size={size}
                    key={form.key("firstName")}
                    {...form.getInputProps("firstName")}
                />

                <TextInput
                    required
                    label={t("common.LastName")}
                    className="w-full"
                    size={size}
                    key={form.key("lastName")}
                    {...form.getInputProps("lastName")}
                />
            </div>

            <TextInput
                required
                label={t("common.EmailAddress")}
                size={size}
                key={form.key("emailAddress")}
                {...form.getInputProps("emailAddress")}
            />

            <TextInput
                required
                label={t("common.Password")}
                size={size}
                type="password"
                key={form.key("password")}
                {...form.getInputProps("password")}
            />

            <div className="mt-6 flex flex-col gap-2 md:flex-row-reverse md:justify-start">
                <Button
                    type="submit"
                    size={size}
                    leftSection={<IconLogin size={iconSize} />}>
                    {t("auth.signin")}
                </Button>

                {onBackClick ? (
                    <Button
                        onClick={onBackClick}
                        variant="light"
                        size={size}
                        leftSection={<IconChevronLeft size={iconSize} />}>
                        {t("common.GoBack")}
                    </Button>
                ) : null}
            </div>
        </form>
    );
}

export default SigninForm;