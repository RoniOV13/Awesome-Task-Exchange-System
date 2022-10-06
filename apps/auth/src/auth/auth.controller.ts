import { Body, Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginGuard } from './login.guard';
import { Issuer } from 'openid-client';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/user/commands/impl/create-user.command';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(LoginGuard)
  @Get('/login')
  login() {}

  @UseGuards(LoginGuard)
  @Get('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Get('/user')
  user(@Request() req) {
    return req.user;
  }

  @UseGuards(LoginGuard)
  @Get('/callback')
  loginCallback(@Res() res: Response) {
    res.redirect('/');
  }

  @Get('/logout')
  async logout(@Request() req, @Res() res: Response) {
    const id_token = req.user ? req.user.id_token : undefined;
    req.logout();
    req.session.destroy(async (error: any) => {
      const TrustIssuer = await Issuer.discover(
        `${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`,
      );
      const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;
      if (end_session_endpoint) {
        res.redirect(
          end_session_endpoint +
            '?post_logout_redirect_uri=' +
            process.env
              .OAUTH2_CLIENT_REGISTRATION_LOGIN_POST_LOGOUT_REDIRECT_URI +
            (id_token ? '&id_token_hint=' + id_token : ''),
        );
      } else {
        res.redirect('/');
      }
    });
  }
}
