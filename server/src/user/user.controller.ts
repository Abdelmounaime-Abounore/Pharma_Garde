import { Body, Controller, Get, Param, Post, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response  } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userData: any): Promise<any> {
    try {
      const result = await this.userService.registerUser(userData);
      return result;
    } catch (error) {
      return { error: error.message };
    }    
  }

  @Get(':token')
  async verifyEmail(@Param('token') token: string) {
    try {
      await this.userService.verifyTokenAndActivateAccount(token);
      return 'Email verified successfully. Your account is now activated.';
    } catch (error) {
      return error.message;
    }
  }

  @Post('login')
  async login(@Body() loginData: any, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const {token} = await this.userService.login(loginData);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
      });
      return { success: 'Login Successful'};
    } catch (error) {
      console.log(error)
      return { error: error.message };
    }
  }

  @Post('check')
  async validateToken(@Req() req: Request) {
    console.log(req)
    const tokenCookie = req.cookies['token'];
    console.log(tokenCookie);
    return true;
  }
}
