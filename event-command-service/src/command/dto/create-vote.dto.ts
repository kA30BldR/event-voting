import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateVoteDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  dateId: string;

  @IsMongoId()
  @IsNotEmpty()
  eventId: string;
}
