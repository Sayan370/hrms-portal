import { SelectChangeEvent } from "@mui/material";

import { UserRoles } from "@/models/types";

export function destructorCompositeKey(
    key: string,
    value: string | string[],
    separator: string = "--"
) {
    let keyValuePair = {};
    const paths = key.split("--");
    if (Array.isArray(value)) {
        const valueMatrix = value.map((item) => item.split(separator));
        const transposedValue = matrixTranspose(valueMatrix);
        paths.forEach((path, i) => {
            keyValuePair = {
                ...keyValuePair,
                [path]: Array.from(new Set(transposedValue[i])),
            }; // remove duplicate values before insert
        });
    } else {
        const valueArr = value.split(separator);
        paths.forEach((path, i) => {
            keyValuePair = { ...keyValuePair, [path]: valueArr[i] };
        });
    }
    return keyValuePair;
}

/** Might not work properly. Please check with all possible value before use */
export function castInRealType(value: string) {
    try {
        if (
            typeof value === "undefined" ||
            value === null ||
            typeof value !== "string"
        )
            return value;

        // ~(-1) = 0 and ~(0) = -1
        if (~["true", "false"].indexOf(value)) return value === "true";
        if (!Number.isNaN(Number(value))) return Number(value);
        return value;
    } catch (e) {
        // logger.log(e);
        return value;
    }
}

export function convertBitmask(flags: number | number[]) {
    if (!Array.isArray(flags)) return flags;
    let result = 0;
    flags.forEach((item) => {
        // eslint-disable-next-line no-bitwise
        result |= item;
    });
    return result;
}

export function appliedInBitmask(flag: number, bitmaskValue: number): boolean {
    return (flag & bitmaskValue) === flag;
}

function matrixTranspose(obj: string[][]) {
    return (
        obj &&
        Object.keys(obj[0]).map((col: string) =>
            obj.map((row: string[]) => row[parseInt(col)])
        )
    );
}

export function castAs<T>(data: any): T {
    let temp: any;
    const k = +data;
    if (Number.isNaN(k)) {
        temp = data === "true" ? true : data === "false" ? false : undefined;
        if (temp === undefined) temp = data;
    } else {
        temp = data === "" ? undefined : k;
    }
    return temp;
}

export function castAsIs<T>(data: any) {
    const type = typeof data;
    let temp: any;
    if (data === null || data === undefined || data === "") return data;
    switch (type) {
        case "boolean":
        case "number":
        case "function":
        case "bigint":
        case "object":
        case "symbol":
            temp = data;
            break;
        case "string":
            // eslint-disable-next-line no-case-declarations
            const k = +data;
            if (Number.isNaN(k)) {
                const trimmedData = data.trim().toLowerCase();
                temp =
                    trimmedData === "true"
                        ? true
                        : trimmedData === "false"
                            ? false
                            : undefined;
                if (temp === undefined) temp = data;
            } else {
                temp = k;
            }
            break;
        default:
            temp = data;
            break;
    }
    return temp;
}

export const getErrorString = (
    errorData: any,
    defaultErrorMessage: string = "Encountered an error"
): string => {
    if (typeof errorData === "string") return errorData;
    if (Array.isArray(errorData)) return getErrorString(errorData[0]);
    if (typeof errorData === "object") {
        if (errorData?.message) return getErrorString(errorData?.message);
        if (errorData?.Message) return getErrorString(errorData?.Message);
        if (errorData?.error) return getErrorString(errorData?.error);
        if (errorData?.errors) return getErrorString(errorData?.errors);
        if (errorData?.statusText) return getErrorString(errorData?.statusText);
    }
    return defaultErrorMessage;
};

export const getEnumKeys = (enumObj: any): string[] => {
    return Object.keys(enumObj).filter((r) => Number.isNaN(parseInt(r)));
};
export const getEnumValues = (enumObj: any): string[] => {
    return Object.keys(enumObj).filter((r) => !Number.isNaN(parseInt(r)));
};

export const getEnumEntries = (enumObj: any): [string, any][] => {
    return Object.keys(enumObj)
        .filter((item) => Number.isNaN(parseInt(item)))
        .map((v) => [v.toString(), enumObj[v as keyof typeof enumObj]]);
};

export const isObjectEqual = (obj1: any, obj2: any) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);

export const toImageSrc = (
    data: string,
    mimeType: string = "image/svg+xml"
) => {
    return `data:${mimeType};base64,${toBase64(data)}`;
};

//  separate words with Capital case and _ within the word
export const separateWords = (word: string): string => {
    return (
        word
            ?.replace(/([A-Z])(?!([A-Z]|$))/g, " $1")
            ?.replace(/_/g, " ")
            ?.trim() ?? ""
    );
};

export const getFormattedNumber = (
    num: number,
    locale?: Intl.LocalesArgument,
    maximumFractionDigits: number = 2,
    minimumFractionDigits: number = 2
) =>
    locale
        ? (num ?? 0).toLocaleString(locale, {
            maximumFractionDigits,
            minimumFractionDigits,
        })
        : (num ?? 0).toFixed(maximumFractionDigits);

export const getNameInitials = (name: string, capitalise: boolean = false) => {
    const initial =
        name
            ?.split(/\s+/)
            ?.reduce((acc, sec) => acc + (sec?.charAt(0) || ""), "") ?? "";
    return capitalise ? initial.toUpperCase() : initial;
};

export const getRole = (role?: UserRoles) => {
    switch (role) {
        case "Admin":
            return "Admin";
        case "User":
            return "Employee";
        case "SuperAdmin":
            return "Super Admin";
        case "CPO":
            return "Chief Procurement Officer";
        case "HRHead":
            return "HR Head";
        default:
            return "Other";
    }
};

export const amountToWords = (
    number: number,
    fractionalUnit: string = "Paise"
): string => {
    const denominations = [
        "",
        "Thousand",
        "Lakh",
        "Crore",
        "Arab",
        "Kharab",
        "Neel",
        "Padma",
        "Shankh",
    ];

    const words = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
    ];
    const tens = [
        "",
        "Ten",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
    ];
    const teens = [
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
    ];

    function convertChunk(num: number): string {
        let chunk = "";
        if (num >= 100) {
            chunk += `${words[Math.floor(num / 100)]} Hundred `;
            num %= 100;
        }
        if (num >= 20) {
            chunk += `${tens[Math.floor(num / 10)]} `;
            num %= 10;
        }
        if (num >= 10 && num < 20) {
            chunk += `${teens[num - 10]} `;
            num = 0;
        }
        if (num > 0) {
            chunk += `${words[num]} `;
        }
        return chunk;
    }

    const numParts = String(number).split(".");
    let wholePart = parseInt(numParts[0]);
    const fractionPart = numParts[1] ? parseInt(numParts[1]) : 0;
    let chunkIndex = 0;

    let result = "";

    while (wholePart > 0) {
        const divider = chunkIndex > 0 ? 100 : 1000;
        const chunk = wholePart % divider;
        if (chunk > 0) {
            result = `${convertChunk(chunk) + denominations[chunkIndex]
                } ${result}`;
        }
        wholePart = Math.floor(wholePart / divider);
        chunkIndex++;
    }

    if (fractionPart > 0) {
        const fractionPartText = convertChunk(fractionPart);
        result += `and ${fractionPartText}${fractionalUnit}`;
    }

    return result.trim();
};

export const downloadBlob = (fileName: string) => (blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName; // Set the desired filename
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

export const getJoinedAddress = (...params: (string | undefined | null)[]) => {
    return sanitizeAddress(params.filter(Boolean).join(", "));
};

export const sanitizeAddress = (address?: string | null) => {
    return (
        address
            ?.replaceAll(/(\s*([,\s*]{2,}))/g, ",")
            ?.replace(/(\s*,{1,}\s*$)/, "") ?? ""
    );
};

export const copyToClipBoard = async (text: string) => {
    if (window.navigator.clipboard) {
        await window.navigator.clipboard.writeText(text);
    } else {
        const el = document.createElement("input");
        el.value = text;

        el.style.position = "absolute";
        el.style.left = "-9999px";
        el.style.zIndex = "999999";
        // el.style.display = "none";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }
};
/**
 * Generates password of given length
 * @param length default is 8
 * @returns password of given length
 */
export function generatePass(length: number = 8): string {
    let pass = "";
    const str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "@#$";

    for (let i = 1; i <= length; i++) {
        const char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char);
    }

    return pass;
}

export const getTimeDiff = (sec: number, accurate: boolean = false) => {
    if (accurate) {
        const h = Math.floor(sec / 3600).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        const m = Math.floor((sec % 3600) / 60).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        const s = Math.floor((sec % 3600) % 60).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });

        return `${h}:${m}:${s}`;
    }
    if (sec > 3600 * 24 * 365)
        return `${Math.floor(sec / (3600 * 24 * 365)).toLocaleString("en-US", {
            minimumIntegerDigits: 1,
            useGrouping: false,
        })}Y`;
    if (sec > 3600 * 24 * 30)
        return `${Math.floor(sec / (3600 * 24 * 30)).toLocaleString("en-US", {
            minimumIntegerDigits: 1,
            useGrouping: false,
        })}M`;
    if (sec > 3600 * 24 * 7)
        return `${Math.floor(sec / (3600 * 24 * 7)).toLocaleString("en-US", {
            minimumIntegerDigits: 1,
            useGrouping: false,
        })}W`;
    if (sec > 3600 * 24)
        return `${Math.floor(sec / (3600 * 24)).toLocaleString("en-US", {
            minimumIntegerDigits: 1,
            useGrouping: false,
        })}D`;
    if (sec > 3600)
        return `${Math.floor(sec / 3600).toLocaleString("en-US", {
            minimumIntegerDigits: 1,
            useGrouping: false,
        })}h`;
    if (sec > 60)
        return `${Math.floor((sec % 3600) / 60).toLocaleString("en-US", {
            minimumIntegerDigits: 1,
            useGrouping: false,
        })}m`;
    return `${Math.floor((sec % 3600) % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 1,
        useGrouping: false,
    })}s`;
};

export const pluralizeWord = (isPlural: boolean, singularWord: string, suffix?: string, pluralWord?: string): string => {
    return suffix ? (!isPlural ? `${singularWord}` : `${singularWord}${suffix}`) : (!isPlural ? `${singularWord}` : `${pluralWord}`);
};

export const isError = (e: Error) => {
    return e &&
        e.stack &&
        e.message &&
        typeof e.stack === 'string' &&
        typeof e.message === 'string';
};