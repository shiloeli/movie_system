import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService {
    private client: Client;

  constructor() {
    this.client = new Client({
      user: "popcorn-palace",
      host: 'localhost',
      database: "popcorn-palace",
      password: "popcorn-palace",
      port: 5432,
    });
    this.client.connect();
  }

  async query(queryString: string, values: any[] = []) {
    const res = await this.client.query(queryString, values);
    return res.rows
  }
}

