import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {
    @Get()
    hello(): string {
        return "첫 번째 Nest.js 프로젝트";
    }
}