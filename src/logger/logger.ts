// logger.ts
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file"; 

const { combine, timestamp, errors, json } = format;

let logger: any;

const NODE_ENV = 'production'; 

if (NODE_ENV as string === "production") {
  logger = createLogger({
    level: "info",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      json()
    ),
    transports: [
      new DailyRotateFile({
        filename: "src/logger/logs/error-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        level: "error",
        maxFiles: "7d",
        zippedArchive: true,
      }),
      new DailyRotateFile({
        filename: "src/logger/logs/info-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        level: "info",
        maxFiles: "7d",
        zippedArchive: true,
      }),
      new DailyRotateFile({
        filename: "src/logger/logs/combined-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        maxFiles: "7d",
        zippedArchive: true,
      }),
    ],
  });

  logger.on("error", (err: any) => {
    console.error("Winston logging error:", err);
  });
} else {
  logger = {
    info: (...args: any[]) => console.log("[INFO]", ...args),
    error: (...args: any[]) => console.error("[ERROR]", ...args),
    warn: (...args: any[]) => console.warn("[WARN]", ...args),
    debug: (...args: any[]) => console.debug("[DEBUG]", ...args),
  };
}

export default logger;
