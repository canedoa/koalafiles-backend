

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({

      // Le decimos a passport-jwt como extraer el token de la petición:
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // El mismo secreto que usamos al firmar los tokens:
      secretOrKey: process.env.JWT_SECRET || 'CHANGE_ME',
    });
  }

  /*
   validate() se ejecuta en automatico despues de verificar la firma
   @param payload = el objeto que firmamos en AuthService (e.g. { sub: userId, email })
   @returns lo que queremos exponer luego como req.user
   */
  async validate(payload: any) {
    return {
      userId: payload.sub,
      email:  payload.email,
    };
  }
}
