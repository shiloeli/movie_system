import { Injectable } from '@nestjs/common';
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class BookingsService {
    constructor(private readonly databaseServices: DatabaseService){
        this.createBookingsTableIfNotExists();
    }

    private async createBookingsTableIfNotExists() {
        await this.databaseServices.query(
          `
          CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            showtimeId INT NOT NULL,
            seatNumber INT NOT NULL,
            userId VARCHAR(255) NOT NULL,
            CONSTRAINT uniqueSeat UNIQUE (showtimeId, seatNumber)
          );
        `);
      }

    async bookTicket(showtimeId: number, seatNumber: number, userId: string){
        const params = [showtimeId, seatNumber, userId];
        const sql  = 'INSERT INTO bookings (showtimeId, seatNumber, userId) VALUES ($1, $2, $3)';
        return this.databaseServices.query(sql,params);
    }

}



  