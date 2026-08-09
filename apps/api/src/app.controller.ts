import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";

@Controller()
export class AppController {
  constructor(
    readonly _appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getHello() {
    // return this.appService.getHello();

    await this.prismaService.$queryRaw`SELECT 1`;

    return { status: "ok", message: "Hello World!" };
  }

  @Get("/health")
  async getHealth() {
    // return this.appService.getHello();

    await this.prismaService.$queryRaw`SELECT 1`;

    return { status: "ok", message: "Hello World!" };
  }
}
