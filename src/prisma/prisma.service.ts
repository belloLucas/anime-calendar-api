import 'dotenv/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$queryRaw`SELECT 1`;
      Logger.log('Database connection established successfully.');
    } catch (error) {
      Logger.error('Failed to connect to the database:', error);
      throw error;
    }
  }
}
