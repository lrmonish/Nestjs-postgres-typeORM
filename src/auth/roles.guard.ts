import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enum/permissions';
import { ROLES_KEY } from './decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('inside role guard');
    // console.log(
    //   'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    //   context.getHandler(),
    //   context.getClass(),
    //   ROLES_KEY,
    // );

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.Roles?.includes(role));
  }
}
