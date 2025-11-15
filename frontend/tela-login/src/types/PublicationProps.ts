export interface PublicationProps {
    id: number;
    id_admin?: number;
    title: string;
    content: string;
    category: string;
    atualization_date?: Date | string;
    publication_date: Date | string;
    likes?: number;
    coments?: number;
    status: string;
}