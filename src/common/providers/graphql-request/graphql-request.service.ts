import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class GraphQLRequestService {
  private readonly apiURL: string;
  private readonly secretKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiURL = `${this.configService.getOrThrow<string>('AAS_API_URL')}?private_key=${this.configService.getOrThrow<string>('AAS_API_PRIVATE_KEY')}`;
    this.secretKey = this.configService.getOrThrow<string>('AAS_API_SECRET_KEY');
  }

  graphQLRequest(options: { query: string; variables?: Record<string, any> }): Observable<AxiosResponse> {
    const { query, variables } = options;

    const requestBody = { query, variables };
    return this.httpService.post(this.apiURL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-secret': this.secretKey,
      },
    });
  }
}
