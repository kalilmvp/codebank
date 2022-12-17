import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { EntityNotFoundException } from './exception-filters/entity-not-found.exception';
import { RpcExceptionFilter } from './exception-filters/rpc.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new EntityNotFoundException(), new RpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
