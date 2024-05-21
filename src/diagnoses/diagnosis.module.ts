import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosis } from './diagnosis.entity';
// import { DiagnosesService } from './diagnoses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosis])],
//   providers: [DiagnosesService],
//   exports: [DiagnosesService],
})
export class DiagnosesModule {}
