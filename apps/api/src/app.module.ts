import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoldersModule } from './folders/folders.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotesService } from './notes/notes.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, FoldersModule, NotesModule],
  controllers: [AppController],
  providers: [AppService, NotesService],
})
export class AppModule {}
