import serverless from "serverless-http";
import app from "../../decisa-backend/src/server.js";

export const handler = serverless(app);