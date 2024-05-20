import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

interface Patient {
    id: number;
    name: string;
    age: number;
    diagnosis: string;
    therapyPlan: string;
}

@Injectable()
export class PatientsService {
    private patients: Patient[] = [];
    private idCounter = 1;

    create(createPatientDto: CreatePatientDto): Patient {
        const newPatient: Patient = {
            id: this.idCounter++,
            ...createPatientDto,
        };
        this.patients.push(newPatient);
        return newPatient;
    }

    findAll(): Patient[] {
        return this.patients;
    }

    findOne(id: number): Patient {
        const patient = this.patients.find(patient => patient.id === id);
        if (!patient) {
            throw new NotFoundException(`Patient with id ${id} not found`);
        }
        return patient;
    }

    update(id: number, updatePatientDto: UpdatePatientDto): Patient {
        const patientIndex = this.patients.findIndex(patient => patient.id === id);
        if (patientIndex === -1) {
            throw new NotFoundException(`Patient with id ${id} not found`);
        }
        const updatedPatient = { ...this.patients[patientIndex], ...updatePatientDto };
        this.patients[patientIndex] = updatedPatient;
        return updatedPatient;
    }

    remove(id: number): Patient {
        const patientIndex = this.patients.findIndex(patient => patient.id === id);
        if (patientIndex === -1) {
            throw new NotFoundException(`Patient with id ${id} not found`);
        }
        const removedPatient = this.patients.splice(patientIndex, 1)[0];
        return removedPatient;
    }
}
