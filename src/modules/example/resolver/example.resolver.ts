import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { seconds } from '@nestjs/throttler';
import { Throttle } from 'src/common/decorators';
import { ExampleService } from '../example.service';
import {
  AllExamplesResponse,
  CreateExampleResponse,
  DeleteExampleResponse,
  ExampleResponse,
  UpdateExampleResponse,
} from '../dto/response/example.response.dto';
import { CreateExampleDto } from '../dto/inputs/create-example.dto';
import { UpdateExampleDto } from '../dto/inputs/update-example.dto';
import { Log } from 'src/modules/log/log.decorator';
import { EntitiesEnum } from 'src/common/enums/entities.enum';
import { ActionsEnum } from 'src/common/enums/actions.enum';

@Resolver()
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}

  @Query(() => AllExamplesResponse)
  @Throttle({
    default: {
      limit: 10,
      ttl: seconds(60),
      exceptionMessage: info => 'Need to wait ' + info.timeToExpire + ' seconds to request this query again.',
    },
  })
  @Log({ entity: EntitiesEnum.EXAMPLE, action: ActionsEnum.READ })
  async getAllExamplesQuery(): Promise<AllExamplesResponse> {
    const response = await this.exampleService.getAllExamples();
    return response;
  }

  @Throttle({
    default: {
      limit: 10,
      ttl: seconds(60),
      exceptionMessage: info => 'Need to wait ' + info.timeToExpire + ' seconds to request this query again.',
    },
  })
  @Query(() => ExampleResponse)
  @Log({ entity: EntitiesEnum.EXAMPLE, action: ActionsEnum.READ })
  async getExampleQuery(@Args('id') id: number): Promise<ExampleResponse> {
    return await this.exampleService.getOneExampleById(id);
  }

  @Throttle({
    default: {
      limit: 10,
      ttl: seconds(60),
      exceptionMessage: info => 'Need to wait ' + info.timeToExpire + ' seconds to request this mutation again.',
    },
  })
  @Log({ entity: EntitiesEnum.EXAMPLE, action: ActionsEnum.CREATE })
  @Mutation(() => CreateExampleResponse)
  async createExampleMutation(@Args('input') input: CreateExampleDto): Promise<CreateExampleResponse> {
    return await this.exampleService.createExample(input);
  }

  @Throttle({
    default: {
      limit: 10,
      ttl: seconds(60),
      exceptionMessage: info => 'Need to wait ' + info.timeToExpire + ' seconds to request this mutation again.',
    },
  })
  @Log({ entity: EntitiesEnum.EXAMPLE, action: ActionsEnum.UPDATE })
  @Mutation(() => UpdateExampleResponse)
  async updateExampleMutation(@Args('id') id: number, @Args('input') input: UpdateExampleDto): Promise<UpdateExampleResponse> {
    return await this.exampleService.updateExample(id, input);
  }

  @Throttle({
    default: {
      limit: 10,
      ttl: seconds(60),
      exceptionMessage: info => 'Need to wait ' + info.timeToExpire + ' seconds to request this mutation again.',
    },
  })
  @Log({ entity: EntitiesEnum.EXAMPLE, action: ActionsEnum.DELETE })
  @Mutation(() => DeleteExampleResponse)
  async deleteExampleMutation(@Args('id') id: number): Promise<DeleteExampleResponse> {
    return await this.exampleService.deleteExample(id);
  }
}
