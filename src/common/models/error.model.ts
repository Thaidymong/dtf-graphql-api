import { ApiProperty } from '@nestjs/swagger';
import { ERRORSTATUSCODE } from '../errors';

export class ValidationError {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message: string;
}

export class Error {
  @ApiProperty({ enum: ERRORSTATUSCODE })
  code: ERRORSTATUSCODE;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: [ValidationError] })
  details: ValidationError[];
}
