import { JwtPayload } from "jsonwebtoken";

export interface ICustomJWTPayload extends JwtPayload{
  id: string;
}