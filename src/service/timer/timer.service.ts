import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimerDTO, UpdateTimerDTO } from 'src/domain/timer/dto/timer.dto';
import { TimerRepository } from 'src/repository/timer/timer.repository';

@Injectable()
export class TimerService {
    constructor(private readonly timerRepository: TimerRepository) {}

    // 타이머 생성
    async createTimer(memberId: number, dto: CreateTimerDTO) {
        return await this.timerRepository.save(memberId, dto);
    }

    // 내 타이머 목록 조회
    async getMyTimers(memberId: number) {
        return await this.timerRepository.findAllByMemberId(memberId);
    }

    // 타이머 수정
    async updateTimer(id: number, memberId: number, dto: UpdateTimerDTO) {
        const timer = await this.timerRepository.findById(id);
        if (!timer || timer.member_id !== memberId) {
            throw new NotFoundException("해당 타이머를 찾을 수 없거나 권한이 없습니다.");
        }
        return await this.timerRepository.update(id, dto);
    }

    // 타이머 삭제
    async deleteTimer(id: number, memberId: number) {
        const timer = await this.timerRepository.findById(id);
        if (!timer || timer.member_id !== memberId) {
            throw new NotFoundException("해당 타이머를 찾을 수 없거나 권한이 없습니다.");
        }
        return await this.timerRepository.delete(id);
    }
}