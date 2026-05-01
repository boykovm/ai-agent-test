import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import { Observable } from 'rxjs';

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

  getStreamingResponse(
    message: string,
    maxTokenCount?: number,
  ): Observable<string> {
    return new Observable((subscriber) => {
      this.openai.chat.completions
        .create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: message }],
          max_tokens: maxTokenCount,
          stream: true,
        })
        .then(async (stream) => {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              subscriber.next(content);
            }
          }
          subscriber.complete();
        })
        .catch((err) => subscriber.error(err));
    });
  }
}
