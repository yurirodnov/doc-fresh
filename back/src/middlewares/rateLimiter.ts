import { Request, Response, NextFunction } from "express";
import { count } from "node:console";

interface RateLimiterEntry {
  tryCount: number;
  resetTime: number;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_TRY = 10;

const store = new Map<string, RateLimiterEntry>();

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();

  const entry = store.get(clientIp);

  if (!entry || now > entry.resetTime) {
    store.set(clientIp, {
      tryCount: 1,
      resetTime: now + WINDOW_MS,
    });
    return next();
  }

  if (entry.tryCount >= MAX_TRY) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({ success: false, message: `Too many request, try after ${retryAfter}` });
  }
};
