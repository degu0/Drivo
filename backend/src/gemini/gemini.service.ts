import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiError, GoogleGenAI } from '@google/genai';
import { Env } from '../config/env';

type ExtractFromFileParams = {
  file: Buffer;
  mimeType: string;
  prompt: string;
  responseJsonSchema: Record<string, unknown>;
};

@Injectable()
export class GeminiService {
  private readonly ai: GoogleGenAI;
  private readonly textModel: string;

  constructor(config: ConfigService<Env, true>) {
    this.ai = new GoogleGenAI({
      apiKey: config.get('GEMINI_API_KEY', { infer: true }),
    });
    this.textModel = config.get('GEMINI_TEXT_MODEL', { infer: true });
  }

  async extractFromFile({
    file,
    mimeType,
    prompt,
    responseJsonSchema,
  }: ExtractFromFileParams): Promise<unknown> {
    let text: string | undefined;

    try {
      const response = await this.ai.models.generateContent({
        model: this.textModel,
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { mimeType, data: file.toString('base64') } },
              { text: prompt },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
          responseJsonSchema,
          temperature: 0,
        },
      });

      text = response.text;
    } catch (error) {
      throw this.toHttpException(error);
    }

    if (!text) {
      throw new UnprocessableEntityException(
        'The AI service returned no data for this file',
      );
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new UnprocessableEntityException(
        'The AI service returned a response in an invalid format',
      );
    }
  }

  private toHttpException(error: unknown): HttpException {
    if (error instanceof ApiError && error.status === 429) {
      return new HttpException(
        'AI service usage limit reached. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return new BadGatewayException(
      'Could not communicate with the AI service',
    );
  }
}