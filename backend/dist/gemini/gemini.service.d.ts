import { ConfigService } from '@nestjs/config';
import { Env } from '../config/env';
type ExtractFromFileParams = {
    file: Buffer;
    mimeType: string;
    prompt: string;
    responseJsonSchema: Record<string, unknown>;
};
export declare class GeminiService {
    private readonly ai;
    private readonly textModel;
    constructor(config: ConfigService<Env, true>);
    extractFromFile({ file, mimeType, prompt, responseJsonSchema, }: ExtractFromFileParams): Promise<unknown>;
    private toHttpException;
}
export {};
