// model Note {
//   id Int @id @default(autoincrement())
//   text String
//   folderId Int?
//   folder Folder? @relation(fields: [folderId], references: [id])
//   createdAt DateTime @default(now())
// }

import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Note' })
export class NoteDto {
  @ApiProperty({ description: '' })
  id: number;
  @ApiProperty({ description: '', example: '' })
  text: string;
  @ApiProperty({ description: '', example: null })
  folderId: number;
  @ApiProperty({ description: '', example: new Date().toLocaleString() })
  createdAt: Date;
  // folder: Folder
}
