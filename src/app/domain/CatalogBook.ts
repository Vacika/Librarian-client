export interface CatalogBook {
    id: string;
    title: string;
    summary: string;
    author: {
        id: number,
        name: string,
        biography: string,
    };
    genre: {
        id: number,
        name: string
    };
}
