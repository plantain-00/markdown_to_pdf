declare module "*.json" {
    export const version: string;
}

declare module "pangu" {
    export function spacing(words: string): string;
}
