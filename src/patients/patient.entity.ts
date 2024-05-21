import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Diagnosis } from '../diagnoses/diagnosis.entity';
import { TherapyPlan } from '../therapy-plans/therapy-plan.entity';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne(() => Diagnosis, diagnosis => diagnosis.patients)
    diagnosis: Diagnosis;

    @ManyToOne(() => TherapyPlan, therapyPlan => therapyPlan.patients)
    therapyPlan: TherapyPlan;
}
