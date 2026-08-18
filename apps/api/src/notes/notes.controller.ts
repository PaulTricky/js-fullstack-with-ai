import { Controller, Get, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { NoteDto } from '../folders/dto/note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID', operationId: 'getNoteById' })
  @ApiOkResponse({
    description: 'This note has been successfully retrieved',
    type: NoteDto,
  })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }
}
