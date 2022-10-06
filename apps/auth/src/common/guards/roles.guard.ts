import {
    Injectable,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
  } from '@nestjs/common'
  import { Reflector } from '@nestjs/core'
  import { AuthGuard } from '@nestjs/passport'
  
  type User = {
    username:string,
    email:string,
    password:string,
    role:string
  }

  @Injectable()
  export class RolesGuard extends AuthGuard('oidc') {
    constructor(private readonly reflector: Reflector) {
      super()
    }
  
    handleRequest(
      err: Error,
      user: User,
      info: Error,
      context: ExecutionContext,
    ): any {
      const roles = this.reflector.get<string[]>('roles', context.getHandler())
      if (!roles) {
        return true
      }
      const hasRole = () => roles.includes(user.role)
      if (!user) {
        throw new UnauthorizedException()
      }
      if (!(user.role && hasRole())) {
        throw new ForbiddenException('Forbidden')
      }
      if (user && user.role && hasRole()) return user
      else return false
    }
  }
  