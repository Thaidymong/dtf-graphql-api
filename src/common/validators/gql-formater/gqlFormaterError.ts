import { HttpStatus } from '@nestjs/common';
import { type ValidationError } from 'class-validator';
import { type GraphQLError, type GraphQLFormattedError } from 'graphql';

export function formatGqlError(error: GraphQLError): GraphQLFormattedError {
  const { message, extensions } = error;
  const originalError = extensions?.originalError as Record<string, string | number>;

  return {
    message,
    extensions: originalError
      ? {
          code: originalError.statusCode,
          error: HttpStatus[originalError.statusCode],
          details: originalError.details,
        }
      : extensions,
  };
}

export function mapEnvError(errors: ValidationError[]) {
  return errors
    .map(error => {
      const { constraints } = error;
      return `- ${Object.values(constraints).join('\n')}`;
    })
    .join('\n');
}
