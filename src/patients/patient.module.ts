import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { Diagnosis } from '../diagnoses/diagnosis.entity';
import { TherapyPlan } from '../therapy-plans/therapy-plan.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Patient, Diagnosis, TherapyPlan])],
    controllers: [PatientsController],
    providers: [PatientsService],
})
export class PatientsModule {}
