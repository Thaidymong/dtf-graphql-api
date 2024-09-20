import { Injectable, Logger } from '@nestjs/common';
import { AwardRepository, BusinessRepository, CategoryRepository, SupportingDocumentRepository } from '../repositories';
import { CreateApplicationFormInput } from '../dto/input';
import { GraphQLError } from 'graphql';
import { ERROR_MESSAGES, ERRORSTATUSCODE } from '~/common/errors';

@Injectable()
export class ApplicationFormService {
  private readonly logger = new Logger(ApplicationFormService.name);
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly awardRepository: AwardRepository,
    private readonly supportingDocumentRepository: SupportingDocumentRepository,
  ) {}

  async createApplicationForm({ createBusinessInput, createAwardInput, file_urls }: CreateApplicationFormInput) {
    try {
      //1. choose category -> find category match the existing
      const category = await this.categoryRepository.findOneBy({ name: createAwardInput.award_type });

      // 2. Check if the same business has already applied for an award in the specified category
      const existingAward = await this.awardRepository.findOne({
        where: {
          business: { business_name: createBusinessInput.business_name },
          category: { id: category.id },
        },
      });

      if (existingAward) {
        throw new GraphQLError(ERROR_MESSAGES.CONFLICT, {
          extensions: {
            code: ERRORSTATUSCODE.CONFLICT,
          },
        });
      }

      //3. create business -> return the business object that just created
      const createdBusiness = await this.businessRepository.save(createBusinessInput);

      //4. create award -> insert award data(json) along with business and category
      const createdAward = await this.awardRepository.save({
        business: createdBusiness,
        category,
        award_data: createAwardInput.award_data,
      });

      //5. create supporting documents -> insert new docs for each award
      if (file_urls && file_urls.length > 0) {
        const supportingDocuments = file_urls.map(file_url => ({
          award: createdAward,
          file_url,
        }));

        await this.supportingDocumentRepository.save(supportingDocuments);
      }

      return createdAward.id && createdBusiness.id > 0;
    } catch (error) {
      this.logger.error(error);
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
