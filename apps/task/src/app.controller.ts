import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

type MESSAGE = {
  id: string,
  username: string,
  email: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('user.created')
  readMessage(@Payload() message: MESSAGE) {
    const response =
      `Receiving a new message from topic: user.created: ` +
      JSON.stringify(message);
    console.log("response",message);
    console.log("response",response);
    return response;
  }

  @MessagePattern('user.updated')
  readMessage1(@Payload() message: MESSAGE) {
    const response =
      `Receiving a new message from topic: user.updated: ` +
      JSON.stringify(message);
    console.log("response",message);
    console.log("response",response);
    return response;
  }

  @MessagePattern('user.changed-role')
  readMessage2(@Payload() message: MESSAGE) {
    const response =
      `Receiving a new message from topic: user.changed-role: ` +
      JSON.stringify(message);
    console.log("response",message);
    console.log("response",response);
    return response;
  }
}
