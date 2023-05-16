import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { Public } from 'src/public/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = await this.authService.register(createUserDto);
    if (!user) throw new BadRequestException();
    return;
  }
}
