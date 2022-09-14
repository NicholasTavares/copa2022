import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDTO {
  @IsString()
  readonly country: string;

  @IsString()
  readonly coach: string;

  @IsString()
  readonly group_id: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsNumber()
  readonly score: number;

  @IsOptional()
  @IsNumber()
  readonly wins: number;

  @IsOptional()
  @IsNumber()
  readonly draws: number;

  @IsOptional()
  @IsNumber()
  readonly losses: number;
}
