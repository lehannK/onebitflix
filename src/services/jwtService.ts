import jwt from "jsonwebtoken";

// secret = assinatura de validação
// a assinatura de validação é um código que somente o emissor e o receptor do token devem conhecer
const secret = "chave-do-jwt";

// método de assinatura de um novo token
export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  },

  // método de verificação de token
  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn);
  },
};
