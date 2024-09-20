import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApplicationFormService } from '../services/application-form.service';
import { Throttle } from '~/common/decorators';
import { seconds } from '@nestjs/throttler';
import { EntitiesEnum } from '~/common/enums/entities.enum';
import { Log } from '~/modules/log/log.decorator';
import { ActionsEnum } from '~/common/enums/actions.enum';
import { CreateApplicationFormInput } from '../dto/input';

@Resolver()
export class ApplicationFormResolver {
  constructor(private readonly applicationFormService: ApplicationFormService) {}

  @Throttle({
    default: {
      limit: 10,
      ttl: seconds(60),
      exceptionMessage: info => `Need to wait ${info.timeToExpire} seconds to request this mutation again.`,
    },
  })
  @Log({ entity: EntitiesEnum.APPLICATION_FORM, action: ActionsEnum.CREATE })
  @Mutation(() => Boolean, { name: 'createApplication' })
  async createApplicationFormMutation(@Args('input') input: CreateApplicationFormInput): Promise<boolean> {
    return await this.applicationFormService.createApplicationForm(input);
  }
}
