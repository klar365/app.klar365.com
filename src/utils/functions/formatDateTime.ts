import { t } from "i18next";

const months = [
    t("common.months.jan"),
    t("common.months.feb"),
    t("common.months.mar"),
    t("common.months.apr"),
    t("common.months.may"),
    t("common.months.jun"),
    t("common.months.jul"),
    t("common.months.aug"),
    t("common.months.sep"),
    t("common.months.oct"),
    t("common.months.nov"),
    t("common.months.des")
];

function formatDateTime(dateTime: Date, format: string = "dd. MMM. yyyy hh:mm") {
    let result = format;

    // Year
    result = result.replaceAll("yyyy", `${dateTime.getFullYear()}`);
    result = result.replaceAll("yy", `${dateTime.getFullYear().toString().slice(2)}`);

    // Month
    result = result.replaceAll("MMMM", months[dateTime.getMonth()]);
    result = result.replaceAll("MMM", months[dateTime.getMonth()].slice(0, 3));
    result = result.replaceAll("MM", `${dateTime.getMonth()}`);

    // Date
    result = result.replaceAll("dd", `${dateTime.getDate()}`);

    // Hour
    result = result.replaceAll("hh", `${dateTime.getHours()}`);

    // Minute
    result = result.replaceAll("mm", `${dateTime.getMinutes()}`);

    // Second
    result = result.replaceAll("ss", `${dateTime.getSeconds()}`);

    return result;
}

export default formatDateTime;