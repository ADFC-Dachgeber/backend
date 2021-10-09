import { PrismaClient, ResetToken, User } from '.prisma/client';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PRISMA, RESET_TOKEN_VALID_HOURS } from '../const';

@Injectable()
export class ResetTokensService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<ResetToken> {
    return await this.prisma.resetToken.create({
      data: {
        userId: user.id,
        token: (await crypto.randomBytes(128)).toString('hex'),
        expiresAt: new Date(Date.now() + 3600 * 1000 * RESET_TOKEN_VALID_HOURS),
      },
    });
  }

  async validate(request: any): Promise<boolean> {
    const { resetToken, email } = request.body;

    if (resetToken && email) {
      const t = await this.prisma.resetToken.findUnique({
        where: { token: resetToken },
        include: { user: true },
      });
      return t && t.expiresAt >= new Date() && t.user.email === email;
    } else {
      return false;
    }
  }
}
