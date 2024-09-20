import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { AwardData } from '../../interfaces';
import { AwardEnum } from '~/common/enums/award.enum';

registerEnumType(AwardEnum, {
  name: 'AwardEnum',
});

@InputType()
export class CreateAwardInput {
  @Field(() => AwardEnum)
  award_type: AwardEnum;

  @Field(() => GraphQLJSON)
  award_data: AwardData;
}
