import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface DecodedUser extends JwtPayload {
  userId: number;
}

export function verifyJwt(token: string): DecodedUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedUser;
  } catch {
    return null;
  }
}
