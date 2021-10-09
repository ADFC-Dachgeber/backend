import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { Public } from '../auth/metadata';
import { UsersService } from '../users/users.service';
import { ResetTokensService } from './reset-tokens.service';

@Controller('reset-tokens')
export class ResetTokensController {
    constructor(
        private readonly usersService: UsersService,
        private readonly resetTokensService: ResetTokensService) { }

    @Public()
    @Post('')
    async create(@Body('email') email: string): Promise<void> {
        const user = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException();
        }

        await this.resetTokensService.create(user);
        return;
    }
}
