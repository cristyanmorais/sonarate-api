import { Request, Response } from 'express';
import { ArtistService } from '../../../domain/services/artist.service';
import { CreateArtistDTO, UpdateArtistDTO } from '../../../domain/entities/artist.entity';

export class ArtistController {
    private service: ArtistService;

    constructor() {
        this.service = new ArtistService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data: CreateArtistDTO = req.body;
            const artist = await this.service.create(data);
            return res.status(201).json(artist);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const artists = await this.service.findAll();
            return res.json(artists);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const artist = await this.service.findById(Number(id));
            return res.json(artist);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data: UpdateArtistDTO = req.body;
            const artist = await this.service.update(Number(id), data);
            return res.json(artist);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.delete(Number(id));
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}