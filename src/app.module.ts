import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [JobsModule, UsersModule, CommonModule],
  providers: [AppService],
})
export class AppModule {}
