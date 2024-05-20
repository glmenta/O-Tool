import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsController } from './patients/patients.controller';

@Module({
  imports: [],
  controllers: [AppController, PatientsController],
  providers: [AppService],
})
export class AppModule {}
