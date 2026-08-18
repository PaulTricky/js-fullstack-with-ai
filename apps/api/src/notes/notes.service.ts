import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';

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

  update(id: number, data: UpdateNoteDto) {
    return this.prismaService.note.update({
      where: { id },
      data: { text: data.text },
    });
  }
}
