import errorIcon from "@/assets/images/bg/error.svg";
import noDataIcon from "@/assets/images/bg/no-data.svg";
import brandIcon from "@/assets/images/logos/brand_logo.svg";
import brandNormalLogo from "@/assets/images/logos/brand_image_big.svg";
import brandWhiteLogo from "@/assets/images/logos/brand_image_big_white.svg";

const image = {
    brandNormalLogo,
    brandWhiteLogo,
    brandIcon,
    errorIcon,
    noDataIcon
};

export function getFullBrandLogo(type: "normal" | "white" | "icon" | "print") {
    switch (type) {
        case "normal":
            return getImage("brandNormalLogo");
        case "white":
            return getImage("brandWhiteLogo");
        case "icon":
            return getImage("brandIcon");
        default:
            return getImage("brandWhiteLogo");
    }
}

export function getImage(name: keyof typeof image) {
    return image[name];
}

export function getProfileImage(imageFile: string) {
    const staticServer = "/";
    return imageFile
        ? `${staticServer}/ProfilePhotos/ProfilePhotos/${imageFile}`
        : "";
}

export function blobCreationFromURL(inputURI: string) {
    let binaryVal;

    // mime extension extraction
    const inputMIME = inputURI.split(",")[0].split(":")[1].split(";")[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(",")[0].indexOf("base64") >= 0)
        binaryVal = atob(inputURI.split(",")[1]);
    // Decoding of base64 encoded string
    else {
        binaryVal = unescape(inputURI.split(",")[1]);
    }

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character
    // it represents

    // Store the bytes of the string to a typed array
    const blobArray = new Uint8Array(binaryVal.length);
    for (let index = 0; index < binaryVal.length; index++) {
        blobArray[index] = binaryVal.charCodeAt(index);
    }

    return new Blob([blobArray], {
        type: inputMIME,
    });
}
export function getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            resolve(dataURL);
        };
        img.onerror = error => {
            reject(error);
        };
        img.src = url;
    });
}
