import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IAppService, IUserService } from 'src/grpc/grpc.interface';
import { microserviceOptions } from 'src/grpc/grpc.option';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private appGrpcService: IAppService;
  private userGrpcService: IUserService;

  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    this.appGrpcService = this.client.getService<IAppService>('AppController');
    this.userGrpcService = this.client.getService<IUserService>(
      'UserController',
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.appGrpcService.accumulate({ data });
  }

  @Get('user')
  getUserInfo(@Query('userid') userid: number): any {
    return this.userGrpcService.getUserInfo({ userid });
  }
}
