import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Diagnosis } from '../diagnoses/diagnosis.entity';
import { TherapyPlan } from '../therapy-plans/therapy-plan.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Diagnosis),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TherapyPlan),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a patient', async () => {
    const createPatientDto: CreatePatientDto = { name: 'John Doe', age: 30, diagnosisId: 1, therapyPlanId: 1 };
    const diagnosis: Diagnosis = { id: 1, name: 'Condition', patients: [] };
    const therapyPlan: TherapyPlan = { id: 1, name: 'Plan', patients: [] };
    const result: Patient = { id: 1, ...createPatientDto, diagnosis, therapyPlan };

    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await controller.create(createPatientDto)).toBe(result);
  });

});
