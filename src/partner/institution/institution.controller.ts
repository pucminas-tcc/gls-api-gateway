import {
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('partner/institution')
export class InstitutionController {
  private readonly logger = new Logger(InstitutionController.name);

  constructor(
    @Inject('GISA_PARTNER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async all() {
    return await this.client.send<string>({ cmd: 'institution.all' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async plan_info(@Param() param: any) {
    this.logger.log('-');
  }
}
