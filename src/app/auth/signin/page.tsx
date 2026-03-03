import SigninForm from "@/components/organisms/SigninForm";

import { Text } from "@mantine/core";
import { t } from "i18next";

function Page() {
    return (
        <div className="p-4">
            <Text size="lg" component="h1">
                {t("auth.Signin")}
            </Text>

            <SigninForm />
        </div>
    );
}

export default Page;