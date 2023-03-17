import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SearchNoticeInput, SearchNoticeOutput } from './dto/search-notice.dto';
import { Notice } from './entity/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}
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
}
