"use client";

import { useState } from "react";
import { Stepper } from "@mantine/core";
import { t } from "i18next";
import SigninForm from "@/components/organisms/SigninForm";
import MfaForm from "@/components/molecules/MfaForm";

function SigninWizard() {
    const [step, setStep] = useState<number>(0);

    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <Stepper active={step} onStepClick={setStep}>
            <Stepper.Step label={t("auth.signin")}>
                <SigninForm
                    setEmailAddress={setEmailAddress}
                    setPassword={setPassword}
                    onSigninSuccess={() => setStep(2)}
                    onMfa={() => setStep(1)}
                />
            </Stepper.Step>

            <Stepper.Step label={t("auth.signin")}>
                <MfaForm
                    emailAddress={emailAddress}
                    password={password}
                    onSigninSuccess={() => setStep(2)}
                />
            </Stepper.Step>

            <Stepper.Completed>
                Logged in!
            </Stepper.Completed>
        </Stepper>
    );
}

export default SigninWizard;