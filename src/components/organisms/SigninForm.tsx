"use client";

import { TransformedValues, useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { TextInput, Transition } from "@mantine/core";
import { t } from "i18next";
import { Dispatch, SetStateAction, useState } from "react";
import z from "zod";
import axios from "axios";
import useMd from "@/hooks/isMd";
import FormActions from "@/components/molecules/FormActions";
import { useMounted } from "@mantine/hooks";

type SigninFormProps = {
    setEmailAddress: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;

    onSigninSuccess: () => unknown;
    onMfa: () => unknown;
    onBackClick?: () => unknown;
};

function SigninForm({
    setEmailAddress,
    setPassword,
    onSigninSuccess,
    onMfa,
    onBackClick
}: Readonly<SigninFormProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            emailAddress: "",
            password: ""
        },
        validate: zodResolver(z.object({
            emailAddress: z.email(),
            password: z.string()
        }))
    });

    function onSubmit(values: TransformedValues<typeof form>) {
        setIsLoading(true);

        axios.post("/api/auth/signin", values)
            .then(response => {
                switch (response.status) {
                    case 202:
                        setEmailAddress(values.emailAddress);
                        setPassword(values.password);

                        onMfa();

                        break;

                    case 204:
                        onSigninSuccess();

                        break;

                    default: console.log(response.data);
                }
            })
            .catch(() => setIsLoading(false));
    }

    const isMd = useMd();

    const size = isMd ? undefined : "lg";

    const isMounted = useMounted();

    return (
        <Transition mounted={isMounted} transition="fade-up">
            {style => (
                <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2" style={style}>
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

                    <FormActions
                        size={size}
                        loading={isLoading}
                        onBackClick={onBackClick}
                        submitLabel={t("auth.signin")}
                    />
                </form>
            )}
        </Transition>
    );
}

export default SigninForm;