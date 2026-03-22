import { Module } from '@nestjs/common';
import { OpenaiController } from 'src/controller/openai/openai.controller';
import { OpenaiService } from 'src/service/openai/openai.service';

@Module({
    controllers: [OpenaiController],
    providers: [OpenaiService],
    exports: [OpenaiService]
})
export class OpenaiModule {;}
