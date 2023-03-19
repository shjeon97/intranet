import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { Role } from 'src/auth/decorator/role.decorator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { RoleName } from 'src/user/entity/role.entity';
import { User } from 'src/user/entity/user.entity';
import { CreateNoticeInput } from './dto/create-notice.dto';
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

  @Mutation(() => CoreOutput)
  @Role([RoleName.Any])
  async createNotice(
    @AuthUser() user: User,
    @Args('input') createNoticeInput: CreateNoticeInput,
  ): Promise<CoreOutput> {
    return this.noticeService.createNotice(user, createNoticeInput);
  }
}
