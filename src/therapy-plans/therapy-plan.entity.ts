import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity()
export class TherapyPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Patient, patient => patient.therapyPlan)
    patients: Patient[];
}
