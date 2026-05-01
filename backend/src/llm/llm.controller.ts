import { Body, Controller, Post } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('/chat')
  async chat(@Body() body: { message: string; maxTokenCount?: number }) {
    return await this.llmService.chat(body.message, body.maxTokenCount);
  }
}
