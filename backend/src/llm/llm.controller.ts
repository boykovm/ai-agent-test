import { Body, Controller, Post, Sse } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('/chat')
  async chat(@Body() body: { message: string; maxTokenCount?: number }) {
    return this.llmService.chat(body.message, body.maxTokenCount);
  }

  @Sse('/chat-stream')
  streamingResponse(@Body() body: { message: string; maxTokenCount?: number }) {
    return this.llmService.getStreamingResponse(
      body.message,
      body.maxTokenCount,
    );
  }
}
