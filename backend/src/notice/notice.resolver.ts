import { Args, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/decorator/role.decorator';
import { RoleName } from 'src/user/entity/role.entity';
import { SearchNoticeInput, SearchNoticeOutput } from './dto/search-notice.dto';
import { NoticeService } from './notice.service';

@Resolver()
export class NoticeResolver {
  constructor(private noticeService: NoticeService) {}

  @Query(() => SearchNoticeOutput)
  @Role([RoleName.Any])
  async searchNotice(
    @Args('input') searchNoticeInput: SearchNoticeInput,
  ): Promise<SearchNoticeOutput> {
    return this.noticeService.searchNotice(searchNoticeInput);
  }
}
