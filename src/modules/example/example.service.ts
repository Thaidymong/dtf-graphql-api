import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AllExamplesResponse,
  CreateExampleResponse,
  DeleteExampleResponse,
  ExampleResponse,
  UpdateExampleResponse,
} from './dto/response/example.response.dto';
import { ExampleRepository } from './repositories/example.repository';
import { ERRORSTATUSCODE, ERROR_MESSAGES } from 'src/common/errors';
import { GraphQLError } from 'graphql';
import { CreateExampleDto, UpdateExampleDto } from './dto/inputs';

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async getAllExamples(): Promise<AllExamplesResponse> {
    try {
      const data = await this.exampleRepository.find();
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: data,
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.BAD_REQUEST, {
          extensions: {
            code: ERRORSTATUSCODE.BAD_REQUEST,
          },
        });
      }
    }
  }

  async getOneExampleById(id: number): Promise<ExampleResponse> {
    try {
      const data = await this.exampleRepository.findOneBy({ id });

      if (!data) {
        throw new GraphQLError(ERROR_MESSAGES.NOT_FOUND, {
          extensions: {
            code: ERRORSTATUSCODE.NOT_FOUND,
          },
        });
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: data,
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.BAD_REQUEST, {
          extensions: {
            code: ERRORSTATUSCODE.BAD_REQUEST,
          },
        });
      }
    }
  }

  async createExample(input: CreateExampleDto): Promise<CreateExampleResponse> {
    try {
      const foundExample = await this.exampleRepository.findOneBy({ example_title: input.example_title });
      if (foundExample) {
        throw new GraphQLError(ERROR_MESSAGES.CONFLICT, {
          extensions: {
            code: ERRORSTATUSCODE.CONFLICT,
          },
        });
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await this.exampleRepository.save(input),
      };
    } catch (error) {
      console.log(error);

      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
          extensions: {
            code: ERRORSTATUSCODE.INTERNAL_SERVER_ERROR,
          },
        });
      }
    }
  }

  async updateExample(id: number, input: UpdateExampleDto): Promise<UpdateExampleResponse> {
    try {
      const foundExample = await this.exampleRepository.findOneBy({ id });
      if (!foundExample) {
        throw new GraphQLError(ERROR_MESSAGES.NOT_FOUND, {
          extensions: {
            code: ERRORSTATUSCODE.NOT_FOUND,
          },
        });
      }

      const exampleInput = { ...foundExample, ...input };

      return {
        statusCode: HttpStatus.OK,
        message: 'Example updated successfully',
        data: await this.exampleRepository.save(exampleInput),
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.BAD_REQUEST, {
          extensions: {
            code: ERRORSTATUSCODE.BAD_REQUEST,
          },
        });
      }
    }
  }

  async deleteExample(id: number): Promise<DeleteExampleResponse> {
    try {
      const foundExample = await this.exampleRepository.findOneBy({ id });
      if (!foundExample) {
        throw new GraphQLError(ERROR_MESSAGES.NOT_FOUND, {
          extensions: {
            code: ERRORSTATUSCODE.NOT_FOUND,
          },
        });
      }
      await this.exampleRepository.remove(foundExample);

      return {
        statusCode: HttpStatus.OK,
        message: 'Example deleted successfully',
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.BAD_REQUEST, {
          extensions: {
            code: ERRORSTATUSCODE.BAD_REQUEST,
          },
        });
      }
    }
  }
}
