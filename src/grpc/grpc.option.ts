import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

// Same options object used by microservice server
export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    url: '0.0.0.0:50051',
    protoPath: [
      join(__dirname, '../../src/grpc/app.proto'),
      join(__dirname, '../../src/grpc/user.proto'),
    ],
    loader: {
      includeDirs: [join(__dirname, '..', 'protos')],
    },
  },
};
