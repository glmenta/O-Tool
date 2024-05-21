import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from 'patients/patient.module';
// import { DiagnosesModule } from 'diagnoses/diagnoses.module';
// import { TherapyPlansModule } from './therapy-plans/therapy-plans.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'otool-user',
      password: 'otool123',
      database: 'otool-db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PatientsModule,
    // DiagnosesModule,
    // TherapyPlansModule,
  ],
})
export class AppModule {}
