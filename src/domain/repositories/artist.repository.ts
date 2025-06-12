import { PrismaClient } from '../../generated/prisma';
import { Artist, CreateArtistDTO, UpdateArtistDTO } from '../entities/artist.entity';

export class ArtistRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateArtistDTO): Promise<Artist> {
    return this.prisma.artist.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany({
      where: {
        deletedAt: null
      }
    });
  }

  async findById(id: number): Promise<Artist | null> {
    return this.prisma.artist.findFirst({
      where: { 
        id,
        deletedAt: null
      }
    });
  }

  async findByMbid(mbid: string): Promise<Artist | null> {
    return this.prisma.artist.findFirst({
      where: { 
        mbid,
        deletedAt: null
      }
    });
  }

  async update(id: number, data: UpdateArtistDTO): Promise<Artist> {
    return this.prisma.artist.update({
      where: { 
        id,
        deletedAt: null
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  async delete(id: number): Promise<Artist> {
    return this.prisma.artist.update({
      where: { 
        id,
        deletedAt: null
      },
      data: {
        deletedAt: new Date()
      }
    });
  }
}