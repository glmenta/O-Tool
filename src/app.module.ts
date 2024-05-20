import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsController } from './patients/patients.controller';
import { PatientsService } from './patients/patients.service';

@Module({
  imports: [],
  controllers: [AppController, PatientsController],
  providers: [AppService, PatientsService],
})
export class AppModule {}
