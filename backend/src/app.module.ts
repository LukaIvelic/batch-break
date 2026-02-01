import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { IssuesModule } from './modules/issues/issues.module';

interface PinoRequest {
  method: string;
  url: string;
}

interface PinoResponse {
  statusCode: number;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            translateTime: 'SYS:standard',
          },
        },
        customProps: () => ({ context: 'HTTP' }),
        autoLogging: true,
        serializers: {
          req: (req: PinoRequest) => ({
            method: req.method,
            url: req.url,
          }),
          res: (res: PinoResponse) => ({
            statusCode: res.statusCode,
          }),
        },
      },
    }),
    DatabaseModule,
    RolesModule,
    UsersModule,
    AuthModule,
    ArticlesModule,
    ShipmentsModule,
    IssuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
