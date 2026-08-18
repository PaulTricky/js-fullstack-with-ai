import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    console.log('id', id);
    return this.prismaService.note.findUnique({ where: { id } });
  }
}
