import { Body, Controller, Post, Sse } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('/chat')
  async chat(@Body() body: { message: string; maxTokenCount?: number }) {
    const response = await this.llmService.chat(
      body.message,
      body.maxTokenCount,
    );
    return { answer: response };
  }

  @Sse('/chat-stream')
  streamingResponse(@Body() body: { message: string; maxTokenCount?: number }) {
    return this.llmService.getStreamingResponse(
      body.message,
      body.maxTokenCount,
    );
  }
}
