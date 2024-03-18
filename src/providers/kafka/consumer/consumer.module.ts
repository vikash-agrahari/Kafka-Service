import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityModule } from 'src/entity/entity.module';
import { ConsumerService } from './consumer.service';


@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class kafkaModule {}

