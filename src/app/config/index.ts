import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  client_local_url: process.env.FRONTEND_LOCAL_URL,
  client_production_url: process.env.FRONTEND_PRODUCTION_URL,
  server_local_url: process.env.BACKEND_LOCAL_URL,
  server_production_url: process.env.BACKEND_PRODUCTION_URL,
  project_mode: process.env.NODE_ENV,
  nextauth_secret: process.env.NEXTAUTH_SECRET as string,
  nextauth_url: process.env.NEXTAUTH_URL,
};
