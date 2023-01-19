import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { StorageModule } from './storage/storage.module';
import * as config from 'config';
import { UploadModule } from './upload/upload.module';
import { FileModule } from './file/file.module';
import { AwsModule } from './aws/aws.module';

const mariaDB = config.get('mariadb');
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: mariaDB.type,
      host: process.env.MARIA_HOSTNAME || mariaDB.host,
      port: process.env.MARIA_PORT || mariaDB.port,
      username: process.env.MARIA_USERNAME || mariaDB.username,
      password: process.env.MARIA_PASSWORD || mariaDB.password,
      database: process.env.MARIA_DATABASE || mariaDB.database,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: mariaDB.synchronize,
    }),
    StorageModule,
    UploadModule,
    FileModule,
    AuthModule,
    AwsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
