import { Artist, CreateArtistDTO, UpdateArtistDTO } from "../entities/artist.entity";
import { ArtistRepository } from "../repositories/artist.repository";

export class ArtistService {
    private repository: ArtistRepository;

    constructor() {
        this.repository = new ArtistRepository();
    }

    async create(data: CreateArtistDTO): Promise<Artist> {
        // Checks if the mbid is already registered
        if (!data.mbid) throw new Error("MBID is required");
        const existingArtist = await this.repository.findByMbid(data.mbid);
        if (existingArtist) throw new Error("Artist with this mbid already exists");

        // Creates the artist
        return this.repository.create(data);
    }

    async findAll(): Promise<Artist[]> {
        return this.repository.findAll();
    }

    async findById(id: number): Promise<Artist | null> {
        const artist = await this.repository.findById(id);
        if (!artist) throw new Error("Artist not found");
        return artist;
    }

    async update(id: number, data: UpdateArtistDTO): Promise<Artist> {
        // Checks if the artist exists and is not deleted
        const artist = await this.repository.findById(id);
        if (!artist) throw new Error("Artist not found");

        // If updating the mbid, checks if it already exists
        if (data.mbid) {
            const existingArtist = await this.repository.findByMbid(data.mbid);
            if (existingArtist && existingArtist.id !== id) {
                throw new Error("Artist with this mbid already exists");
            }
        }

        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<Artist> {
        // Checks if the artist exists and is not deleted
        const artist = await this.repository.findById(id);
        if (!artist) throw new Error("Artist not found");

        return this.repository.delete(id);
    }
}