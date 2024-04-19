import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

interface AuthResponse {
  access_token: string | null;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  signUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Post('/login')
  async login(@Request() req): Promise<AuthResponse> {
    return this.authService.signIn(req.body);
  }

  @Post('/maprole/:userid')
  async assignRoles(@Body() roles: number[], @Param('userid') userid: string) {
    console.log(roles, userid);
    return await this.authService.assignRolesToUsers(userid, roles);
  }
}
