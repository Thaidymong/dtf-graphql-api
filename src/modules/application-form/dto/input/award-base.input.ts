import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
export abstract class IBestEcommercePlatform {
  @Field()
  user_experience: string;

  @Field()
  performance: string;

  @Field()
  security: string;

  @Field()
  innovation: string;

  @Field()
  user_testimonials: string;
}

@InterfaceType()
export abstract class IEcommerceChampionOfTheYear {
  @Field()
  overall_impact: string;

  @Field()
  innovation: string;

  @Field()
  sustainability: string;

  @Field()
  social_impact: string;

  @Field()
  vision: string;
}

@InterfaceType()
export abstract class IMostInnovativeDigitalTradeSolution {
  @Field()
  creativity: string;

  @Field()
  problem_solved: string;

  @Field()
  scalability: string;

  @Field()
  user_feedback: string;

  @Field()
  future_plans: string;
}

@ObjectType({ implements: IBestEcommercePlatform })
export class BestEcommercePlatform implements IBestEcommercePlatform {
  innovation: string;
  performance: string;
  security: string;
  user_experience: string;
  user_testimonials: string;
}
