import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { FoldersController } from "./folders.controller";
import { FoldersService } from "./folders.service";

@Module({
  controllers: [FoldersController],
  providers: [FoldersService],
  imports: [PrismaModule],
})
export class FoldersModule {}
