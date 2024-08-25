export class StorageService {
    private key: string = "";
    constructor(private keyIdentifier: string) {
        this.key = keyIdentifier;
    }

    set(data: string | object) {
        let strData: string;
        if (typeof data !== "string") {
            try {
                strData = JSON.stringify(data);
            } catch (error) {
                return;
            }
        } else strData = data;
        localStorage.setItem(this.key, strData);
    }

    get(): any {
        const data = localStorage.getItem(this.key);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                return data;
            }
        }
        return undefined;
    }

    clear(): void {
        localStorage.removeItem(this.key);
    }
}
