import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { ChatBotDTO } from 'src/domain/chatbot/chatbot.dto';
import { OpenaiService } from 'src/service/openai/openai.service';

@Controller('openai')
export class OpenaiController {

    constructor(private readonly oepnaiService:OpenaiService){;}

    @ApiOperation({summary: "Openai에게 질문하는 서비스"})
    @Post("question")
    async question(
        @Body() chatBotDTO:ChatBotDTO
    ){
        const { question } = chatBotDTO;
        const answer = await this.oepnaiService.askOpenAI(question)
        return new ApiResponse("질문 답변 완료", answer)
    }

    @ApiOperation({summary: "Openai에게 질문하는 stream 답변 서비스"})
    @Post("stream-question")
    async streamQuestion(
        @Body() chatBotDTO:ChatBotDTO,
        @Res() res: Response
    ){
        const { question } = chatBotDTO;
        const answer = await this.oepnaiService.streamAskOpenAI(question)
        
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        for await (const chunk of answer){
            if(chunk.type === "response.output_text.delta"){
                res.write(chunk.delta)
            }
        }
        
        res.end();
    }

    @ApiOperation({summary: "Openai에게 질문하는 stream 답변 서비스"})
    @Post("role-question")
    async roleQuestion(
        @Body() chatBotDTO:ChatBotDTO,
        @Res() res: Response
    ){
        const { question } = chatBotDTO;
        const answer = await this.oepnaiService.roleAskOpenAI(question)
        
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        for await (const chunk of answer){
            if(chunk.type === "response.output_text.delta"){
                res.write(chunk.delta)
            }
        }
        
        res.end();
    }


    @ApiOperation({summary: "Openai를 통해 원하는 데이터를 parsing하는 서비스"})
    @Post("out-parser")
    async outParser(
        @Body() chatBotDTO:ChatBotDTO
    ){
        const { question } = chatBotDTO;
        const recipes = await this.oepnaiService.outParserAskOpenAI(question)
        return new ApiResponse("질문 답변 완료", recipes)
    }
}
