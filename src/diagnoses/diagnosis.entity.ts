import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity()
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Patient, patient => patient.diagnosis)
    patients: Patient[];
}
