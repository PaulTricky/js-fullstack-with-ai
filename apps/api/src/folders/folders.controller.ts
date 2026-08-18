import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FolderDto } from './dto/folder.dto';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  @ApiOkResponse({ type: [FolderDto] })
  @ApiOperation({ summary: 'Get all folders', operationId: 'getFolders' })
  findAll() {
    return this.foldersService.findAll();
  }
}
