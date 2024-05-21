export class CreatePatientDto {
  readonly name: string;
  readonly age: number;
  readonly diagnosisId: number;
  readonly therapyPlanId: number;
}
