import * as pdfMake from "pdfmake/build/pdfmake";

import "pdfmake/build/vfs_fonts";

import { config } from "./app-config";

if (config.env.MODE === "development") {
    (async () => {
        const pdf = await import("pdfmake/build/vfs_fonts");
        (pdfMake as any).vfs = pdf.pdfMake.vfs;
    })();
}

export { pdfMake };
