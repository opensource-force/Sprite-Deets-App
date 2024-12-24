
export interface Model {
    id: string;
    verify(): boolean;
    clone(): Model;
    toString(): string;
}