import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';
import { In, Repository } from 'typeorm';
import { AllMeetingRoomOutput } from './dto/all-meeting-room.dto';
import { CreateMeetingRoomInput } from './dto/create-meeting-room.dto';
import { CreateReservationInput } from './dto/create-reservation.entity';
import {
  FindReservationsInput,
  FindReservationsOutput,
} from './dto/find-reservations.dto';
import { MeetingRoom } from './entity/meeting-room.entity';
import { Reservation } from './entity/reservation.entity';

@Injectable()
export class MeetingRoomService {
  constructor(
    @InjectRepository(MeetingRoom)
    private readonly meetingRoomRepository: Repository<MeetingRoom>,
  ) {}
  private readonly logger = new Logger();

  async allMeetingRoom(): Promise<AllMeetingRoomOutput> {
    try {
      const meetingRooms = await this.meetingRoomRepository.find();
      return {
        ok: true,
        meetingRooms,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '모든 회의실 가져오기 실패',
      };
    }
  }

  async createMeetingRoom({
    name,
  }: CreateMeetingRoomInput): Promise<CoreOutput> {
    try {
      await this.meetingRoomRepository.save(
        this.meetingRoomRepository.create({
          name,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '회의실 생성 실패',
      };
    }
  }
}

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(MeetingRoom)
    private readonly meetingRoomRepository: Repository<MeetingRoom>,
  ) {}
  private readonly logger = new Logger();

  async findReservations({
    date,
  }: FindReservationsInput): Promise<FindReservationsOutput> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { date },
      });
      return {
        ok: true,
        reservations,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '회의실 예약 리스트 가져오기 실패',
      };
    }
  }

  async createReservation(
    createReservationInput: CreateReservationInput,
  ): Promise<CoreOutput> {
    try {
      const users = await this.userRepository.find({
        where: {
          id: In(createReservationInput.userIds),
        },
      });

      const meetingRoom = await this.meetingRoomRepository.findOne({
        where: { id: createReservationInput.meetingRoomId },
      });

      const findReservations = await this.reservationRepository.find({
        where: {
          date: createReservationInput.date,
          meetingRoom: { id: createReservationInput.meetingRoomId },
        },
      });

      findReservations.map((reservation) => {
        if (
          createReservationInput.startTime > reservation.startTime &&
          createReservationInput.startTime < reservation.endTime
        ) {
          return {
            ok: false,
            error: '예약 시간이 겹칩니다',
          };
        }

        if (
          createReservationInput.endTime > reservation.startTime &&
          createReservationInput.endTime < reservation.endTime
        ) {
          return {
            ok: false,
            error: '예약 시간이 겹칩니다',
          };
        }
      });

      await this.reservationRepository.save(
        this.reservationRepository.create({
          ...createReservationInput,
          users,
          meetingRoom,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '회의실 예약 생성 실패',
      };
    }
  }
}
