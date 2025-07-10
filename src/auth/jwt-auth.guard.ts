
import { Injectable, ExecutionContext  } from '@nestjs/common';
import { AuthGuard }  from '@nestjs/passport';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {


    // Sobrescribimos handleRequest para debug
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log('🛡️ [JwtAuthGuard] handleRequest →', { err, user, info });
    // Llamamos al padre para que realice el flujo normal:
    return super.handleRequest(err, user, info, context);
  }
}
