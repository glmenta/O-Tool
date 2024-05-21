import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto): Promise<Patient> {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientsService.remove(+id);
  }
}
