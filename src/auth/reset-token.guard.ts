import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ResetTokensService } from '../reset-tokens/reset-tokens.service';

@Injectable()
export class ResetTokenGuard implements CanActivate {
  constructor(private readonly resetTokensService: ResetTokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.resetTokensService.validate(request);
  }
}
