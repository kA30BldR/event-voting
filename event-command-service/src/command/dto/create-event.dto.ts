import { IsString, IsArray, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  dates: Date[];

  @IsMongoId()
  @IsNotEmpty()
  createdBy: string;
}
