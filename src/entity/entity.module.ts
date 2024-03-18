import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
@Module({
  imports: [DatabaseModule],
})
export class EntityModule {}
