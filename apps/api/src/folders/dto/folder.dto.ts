import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { NoteDto } from './note.dto';

// model Folder {
//   id Int @id @default(autoincrement())
//   name String
//   parentId Int?
//   parent Folder? @relation("FolderToFolder", fields: [parentId], references: [id])
//   children Folder[] @relation("FolderToFolder")

//   notes Note[]
//   createdAt DateTime @default(now())
// }

@ApiSchema({ name: 'Folder' })
export class FolderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number, nullable: true, example: null })
  parentId: number | null;

  @ApiProperty({ type: () => FolderDto, example: null })
  parent: FolderDto | null;

  @ApiProperty({ type: () => [FolderDto], example: [] })
  children: FolderDto[] | null;

  @ApiProperty({ type: () => [NoteDto], example: [] })
  notes: NoteDto[] | null;

  @ApiProperty({ type: Date })
  createdAt: Date | null;
}
