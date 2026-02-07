import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'The ID of the anime to favorite',
    example: 1,
  })
  animeId: number;
}
