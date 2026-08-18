import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { NotesService } from './notes.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { NoteDto } from '../folders/dto/note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

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

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note', operationId: 'updateNote' })
  @ApiOkResponse({
    description: 'This note has been successfully updated',
    type: NoteDto,
  })
  update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    return this.notesService.update(+id, body);
  }
}
