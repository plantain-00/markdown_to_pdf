declare module "*.json" {
    export const version: string;
}

declare module "puppeteer" {
    export function launch(): Promise<Browser>;
    export class Browser {
        newPage(): Promise<Page>;
        close(): void;
    }
    export class Page {
        setContent(html: string): Promise<void>;
        pdf(options: { path: string }): Promise<void>;
    }
}

declare module "pangu" {
    export function spacing(words: string): string;
}
