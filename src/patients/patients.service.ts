import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Diagnosis } from '../diagnoses/diagnosis.entity';
import { TherapyPlan } from '../therapy-plans/therapy-plan.entity';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>,
        @InjectRepository(Diagnosis)
        private diagnosesRepository: Repository<Diagnosis>,
        @InjectRepository(TherapyPlan)
        private therapyPlansRepository: Repository<TherapyPlan>,
    ) {}

    async create(createPatientDto: CreatePatientDto): Promise<Patient> {
        const { diagnosisId, therapyPlanId, ...patientData } = createPatientDto;

        const diagnosis = await this.diagnosesRepository.findOne({ where: { id: diagnosisId } });
        if (!diagnosis) {
        throw new NotFoundException(`Diagnosis with id ${diagnosisId} not found`);
        }

        const therapyPlan = await this.therapyPlansRepository.findOne({ where: { id: therapyPlanId } });
        if (!therapyPlan) {
        throw new NotFoundException(`TherapyPlan with id ${therapyPlanId} not found`);
        }

        const patient = this.patientsRepository.create({
        ...patientData,
        diagnosis,
        therapyPlan,
        });

        return await this.patientsRepository.save(patient);
    }

    async findAll(): Promise<Patient[]> {
        return await this.patientsRepository.find({ relations: ['diagnosis', 'therapyPlan'] });
    }

async findOne(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({ where: { id } })
    if (!patient) {
        throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return patient;
}

    async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
        const { diagnosisId, therapyPlanId, ...updateData } = updatePatientDto;

        const patient = await this.patientsRepository.preload({
        id,
        ...updateData,
        });
        if (!patient) {
        throw new NotFoundException(`Patient with id ${id} not found`);
        }

        if (diagnosisId) {
        const diagnosis = await this.diagnosesRepository.findOne({ where: { id: diagnosisId } });
        if (!diagnosis) {
            throw new NotFoundException(`Diagnosis with id ${diagnosisId} not found`);
        }
        patient.diagnosis = diagnosis;
        }

        if (therapyPlanId) {
        const therapyPlan = await this.therapyPlansRepository.findOne({ where: { id: therapyPlanId } });
        if (!therapyPlan) {
            throw new NotFoundException(`TherapyPlan with id ${therapyPlanId} not found`);
        }
        patient.therapyPlan = therapyPlan;
        }

        return this.patientsRepository.save(patient);
    }

    async remove(id: number): Promise<void> {
        const patient = await this.findOne(id);
        await this.patientsRepository.remove(patient);
    }
}
