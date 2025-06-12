export interface Artist {
    id: number;
    name: string;
    mbid: string | null;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateArtistDTO {
    name: string;
    mbid?: string;
    imageUrl?: string;
}

export interface UpdateArtistDTO {
    name?: string;
    mbid?: string;
    imageUrl?: string;
}