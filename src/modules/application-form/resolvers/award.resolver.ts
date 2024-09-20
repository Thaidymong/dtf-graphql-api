import { Args, Query, Resolver } from '@nestjs/graphql';
import { Throttle } from '~/common/decorators';
import { seconds } from '@nestjs/throttler';
import { EntitiesEnum } from '~/common/enums/entities.enum';
import { Log } from '~/modules/log/log.decorator';
import { ActionsEnum } from '~/common/enums/actions.enum';
import { AwardService } from '../services';
import { AwardResponse } from '../dto/response/award.response';
import { AwardEnum } from '~/common/enums/award.enum';

@Resolver()
export class AwardResolver {
  constructor(private readonly awardService: AwardService) {}

  @Throttle({
    default: {
      limit: 10,
      ttl: seconds(60),
      exceptionMessage: info => `Need to wait ${info.timeToExpire} seconds to request this mutation again.`,
    },
  })
  @Log({ entity: EntitiesEnum.APPLICATION_FORM, action: ActionsEnum.READ })
  @Query(() => [AwardResponse], { name: 'awardsByCategory' })
  async getAwardsByCategory(@Args('name', { type: () => AwardEnum }) name: AwardEnum): Promise<AwardResponse[]> {
    return await this.awardService.findAllAwardsByCategory(name);
  }
}
