export const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"

export const isGuid = (str: string) => {
    const guidPattern = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/;
    return guidPattern.test(str);
}