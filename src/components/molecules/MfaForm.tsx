import { PinInput, Transition } from "@mantine/core";
import { t } from "i18next";
import { useState } from "react";
import useMd from "@/hooks/isMd";
import FormActions from "@/components/molecules/FormActions";
import { TransformedValues, useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import axios from "axios";
import z from "zod";
import { useMounted } from "@mantine/hooks";

type MfaFormProps = {
    emailAddress: string;
    password: string;

    onBackClick?: () => unknown;
    onSigninSuccess?: () => unknown;
};

function MfaForm({ emailAddress, password, onBackClick, onSigninSuccess }: Readonly<MfaFormProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            totp: "",
        },
        validate: zodResolver(z.object({
            totp: z.string().length(6)
        }))
    });

    function onSubmit(values: TransformedValues<typeof form>) {
        setIsLoading(true);

        axios.post("/api/auth/signin", {
            emailAddress,
            password,
            ...values
        })
            .then(() => onSigninSuccess?.())
            .catch(() => setIsLoading(false));
    }

    const isMd = useMd();

    const size = isMd ? undefined : "lg";

    const isMounted = useMounted();

    return (
        <Transition mounted={isMounted} transition="fade-up">
            {style => (
                <form onSubmit={form.onSubmit(onSubmit)} style={style}>
                    <div className="w-fit mx-auto my-20">
                        <PinInput
                            oneTimeCode
                            size={size}
                            length={6}
                            key={form.key("totp")}
                            {...form.getInputProps("totp")}
                        />
                    </div>

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

export default MfaForm;