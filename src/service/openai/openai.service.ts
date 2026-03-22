import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {

    private openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY
    })

    // chatbot01
    async askOpenAI(question: string){
        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            input: question,
            max_output_tokens: 300 // 응답 토큰 개수 제한
        });

        return response.output_text;
    }

    // chatbot02
    async streamAskOpenAI(question: string){
        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            input: question,
            max_output_tokens: 300, // 응답 토큰 개수 제한,
            stream: true
        });

        console.log(response)
        return response
    }

    private messages:any[] =[
                { 
                    role: "system",
                    content: `
                        너는 샐러리맨이야! 서비스에 대해서 물어본다면, 서비스를 기업에게 판매할 수 있도록
                        장점들을 상세하게 설명하고, 단점들은 부각되지 않게 서비스를 설명해줘
                        만약에 다른 서비스에 대해서 물어본다면 그냥 정상적인 답변을 해줘!
                        `
                },
                { 
                    role: "system",
                    content: `
                        서비스에 대한 설명만 아래의 템플릿과 같이 답변해줘.
                        1. 서비스가 좋다.
                        2. 비용이 적게 든다.
                        3. 성취감이 생긴다.
                        `
                },
                { 
                    role: "system",
                    content: `
                        프리고고는 냉장고의 재료들을 조합해서,
                        레시피를 조합하고 추천하는 서비스.
                    `
                },
            ]


    // chatbot03
    async roleAskOpenAI(question: string){

        this.messages.push({role: "user", content: question})

        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            max_output_tokens: 300, // 응답 토큰 개수 제한,
            stream: true,
            input: this.messages
        });

        return response
    }


    // chatbot04
    // 1. 사용자가 입력한 요리 재료 -> 당근, 양파, 상추, 돼지고기
    // 2. 만들 수 있는 요리 -> 요리명
    // 3. 요리를 만들 수 있는 순서
    // Out Parse
    // 4. JSON format으로 변경
    private async getPossibleRecipes(ingredient: string){
        //  당근, 양파, 상추, 돼지고기
         const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            max_output_tokens: 300, // 응답 토큰 개수 제한,
            input: [
                {
                    role: "system", // 역할
                    content: "한식, 중식, 양식 등 모든 요리를 할 수 있는 요리 전문가야!"
                },
                {
                    role: "system", // 응답
                    content: `요리명을 아래와 같이 리스트로 6개를 나열시켜줘!
                        예시)
                        짜장면, 짬뽕, 김치찌개, 된장찌개, 갈비찜, 파스타

                        그 외 아무것도 답변하지 마!
                    `
                },
                {
                    role: "user",
                    content: ingredient
                }
            ]
        });

        console.log(response.output_text)
        return response.output_text
    }

    //  '제육볶음, 돼지고기 볶음밥, 숙주나물 무침, 양파 볶음, 당근전, 돼지고기 스튜'
    //  ->

    // [{
    //      name: 제육볶음, 
    //      step: ["1. 재료를 씻는다", "2. 당근 볶는다."]
    // }]
    // out parser
    async outparser(dishes: string){

        const templates = `
            [
                {
                    "name": "제육볶음",
                    "step": [
                        "1. 돼지 앞다리살 250g, 양파 80g, 대파 30g, 고춧가루 1.5큰술, 다진 마늘 1큰술 재료를 준비한다.",
                        "2. 야채를 흐르는 물에 30초 씻는다.",
                        "3. 야채를 먹기 좋은 크기로 썰어서 준비한다.",
                        "4. 중간 불에 야채를 15초 ~ 30초 정도 볶는다."
                    ]
                },
                {
                    "name": "숙주볶음",
                    "step": [
                        "1. 돼지 앞다리살 250g, 양파 80g, 대파 30g, 고춧가루 1.5큰술, 다진 마늘 1큰술 재료를 준비한다.",
                        "2. 야채를 흐르는 물에 30초 씻는다.",
                        "3. 야채를 먹기 좋은 크기로 썰어서 준비한다.",
                        "4. 중간 불에 야채를 15초 ~ 30초 정도 볶는다."
                    ]
               },
            ]
        `

        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            input: [
                {
                    role: "system", // 역할
                    content: "저는 흑백요리사에 최고 우승자가 될 수 있는 실력을 가진 요리사야!"
                },
                {
                    role: "system", // 응답
                    content: `
                        전달한 6개의 음식을 모두 반드시 아래의 형식을 맞춰서 데이터를 전달해줘!
                        그 외에 답변은 절대하지마!
                        ex)
                        ${templates}
                    `
                },
                {
                    role: "user",
                    content: dishes
                }
            ]
        });

        console.log(response.output_text)
        return JSON.parse(response.output_text)
    }

    async outParserAskOpenAI(question: string){
        const dishes = await this.getPossibleRecipes(question)
        const recipes = await this.outparser(dishes)
        return recipes;
    }


}
