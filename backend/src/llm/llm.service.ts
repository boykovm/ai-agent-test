import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class LlmService implements OnModuleInit {
  private openai: OpenAI;

  constructor() {}

  onModuleInit() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(message: string, maxTokenCount?: number) {
    const answer = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
      max_tokens: maxTokenCount,
    });

    return answer.choices[0].message.content;
  }
}
