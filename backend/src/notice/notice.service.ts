import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateNoticeInput } from './dto/create-notice.dto';
import { EditNoticeInput } from './dto/edit-notice.dto';
import { GetNoticeInput, GetNoticeOutput } from './dto/get-notice.dto';
import { SearchNoticeInput, SearchNoticeOutput } from './dto/search-notice.dto';
import { Notice, NoticeStatus } from './entity/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}
  private readonly logger = new Logger();

  async getNotice({ id }: GetNoticeInput): Promise<GetNoticeOutput> {
    try {
      const notice = await this.noticeRepository.findOne({ where: { id } });
      return {
        ok: true,
        notice,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '공지 정보 가져오기 실패',
      };
    }
  }

  async searchNotice({
    page,
    value,
    type,
    sort,
    pageSize,
  }: SearchNoticeInput): Promise<SearchNoticeOutput> {
    try {
      const [notices, totalResult] = await this.noticeRepository.findAndCount({
        ...(type &&
          value && {
            where: { [type]: ILike(`%${value.trim()}%`) },
          }),
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: {
          ...(sort && { [sort]: 'DESC' }),
        },
      });

      return {
        ok: true,
        notices,
        totalPage: Math.ceil(totalResult / pageSize),
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '공지사항 리스트 찾기 실패',
      };
    }
  }

  async createNotice(
    user: User,
    { title, contents, status }: CreateNoticeInput,
  ): Promise<CoreOutput> {
    try {
      await this.noticeRepository.save(
        this.noticeRepository.create({
          title,
          contents,
          status,
          user,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);

      return {
        ok: false,
        error: '공지 생성 실패',
      };
    }
  }

  async editNotice(
    user: User,
    editNoticeInput: EditNoticeInput,
  ): Promise<CoreOutput> {
    try {
      const exist = await this.noticeRepository.findOne({
        where: { id: editNoticeInput.id },
      });

      if (exist.status === NoticeStatus.Writer && user.id !== exist.user.id) {
        return {
          ok: false,
          error: '공지 변경 권한이 없습니다',
        };
      }

      await this.noticeRepository.save(
        this.noticeRepository.create({ ...editNoticeInput }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: '공지 업데이트 실패' };
    }
  }
}
