import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService } from 'src/grpc/grpc.interface';
import { microserviceOptions } from 'src/grpc/grpc.option';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.grpcService.accumulate({ data });
  }
}
