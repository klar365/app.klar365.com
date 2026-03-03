import i18next from "i18next";
import no from "./resources/no.json";

import { initReactI18next } from "react-i18next";

i18next
    .use(initReactI18next)
    .init({
        resources: { no },
        lng: "no",
        fallbackLng: "no",
        interpolation: {
            escapeValue: false
        }
    });