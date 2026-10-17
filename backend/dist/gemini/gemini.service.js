"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const genai_1 = require("@google/genai");
let GeminiService = class GeminiService {
    ai;
    textModel;
    constructor(config) {
        this.ai = new genai_1.GoogleGenAI({
            apiKey: config.get('GEMINI_API_KEY', { infer: true }),
        });
        this.textModel = config.get('GEMINI_TEXT_MODEL', { infer: true });
    }
    async extractFromFile({ file, mimeType, prompt, responseJsonSchema, }) {
        let text;
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
        }
        catch (error) {
            throw this.toHttpException(error);
        }
        if (!text) {
            throw new common_1.UnprocessableEntityException('The AI service returned no data for this file');
        }
        try {
            return JSON.parse(text);
        }
        catch {
            throw new common_1.UnprocessableEntityException('The AI service returned a response in an invalid format');
        }
    }
    toHttpException(error) {
        if (error instanceof genai_1.ApiError && error.status === 429) {
            return new common_1.HttpException('AI service usage limit reached. Please try again later.', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        return new common_1.BadGatewayException('Could not communicate with the AI service');
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map