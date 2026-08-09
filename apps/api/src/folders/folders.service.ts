import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FoldersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const folders = await this.prismaService.folder.findMany();

    return folders;
  }
}
