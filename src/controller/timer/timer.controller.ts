import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { CreateTimerDTO, UpdateTimerDTO } from 'src/domain/timer/dto/timer.dto';
import { TimerService } from 'src/service/timer/timer.service';
import type { AuthRequest } from 'src/type/auth.type';
// import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard'; // JWT 가드가 있다면 추가

@ApiTags('Timer')
@Controller('timer')
export class TimerController {
    constructor(private readonly timerService: TimerService) {}

    @ApiOperation({ summary: "복용 타이머 생성" })
    // @UseGuards(JwtAuthGuard) // 실제 인증 가드 적용 필요
    @Post()
    async createTimer(@Req() req: AuthRequest, @Body() dto: CreateTimerDTO) {
        // req.user.id는 현재 인증된 유저의 ID
        const memberId = req.user?.id || 1; // 임시 유저ID (인증 연동 시 || 1 제거)
        const timer = await this.timerService.createTimer(memberId, dto);
        return new ApiResponse("타이머가 생성되었습니다.", timer);
    }

    @ApiOperation({ summary: "내 타이머 목록 조회" })
    // @UseGuards(JwtAuthGuard)
    @Get()
    async getMyTimers(@Req() req: AuthRequest) {
        const memberId = req.user?.id || 1; 
        const timers = await this.timerService.getMyTimers(memberId);
        return new ApiResponse("내 타이머 목록 조회 성공", timers);
    }

    @ApiOperation({ summary: "타이머 시간 수정" })
    // @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateTimer(
        @Req() req: AuthRequest,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTimerDTO
    ) {
        const memberId = req.user?.id || 1;
        const updatedTimer = await this.timerService.updateTimer(id, memberId, dto);
        return new ApiResponse("타이머가 수정되었습니다.", updatedTimer);
    }

    @ApiOperation({ summary: "타이머 삭제" })
    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTimer(
        @Req() req: AuthRequest,
        @Param('id', ParseIntPipe) id: number
    ) {
        const memberId = req.user?.id || 1;
        await this.timerService.deleteTimer(id, memberId);
        return new ApiResponse("타이머가 삭제되었습니다.");
    }
}