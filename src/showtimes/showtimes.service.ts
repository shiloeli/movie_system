import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ShowtimesService {
    constructor(private readonly databaseServices: DatabaseService){
        this.createShowtimesTableIfNotExists();
    }
  
    private async createShowtimesTableIfNotExists() {
      await this.databaseServices.query(
        `DROP TABLE IF EXISTS showtimes`
      )  
      await this.databaseServices.query(
        `
        CREATE TABLE IF NOT EXISTS showtimes (
          id SERIAL PRIMARY KEY,
          movieId INT NOT NULL,
          theater VARCHAR(255) NOT NULL,
          start_time VARCHAR(255) NOT NULL,
          end_time VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL
        );
      `);
    }

    async validateNoOverlapping(theater: string, start_time: string, end_time: string){
        const sql = 
                    `SELECT COUNT(*) 
                    FROM showtimes
                    WHERE theater = $1
                    AND (
                        (start_time BETWEEN $2 AND $3) 
                        OR 
                        (end_time BETWEEN $2 AND $3)
                        OR
                        (start_time < $2 AND end_time > $3)
                    );
                    `
        const res = await this.databaseServices.query(sql,[theater,start_time,end_time]);
        if (res[0].count > 0){
            return false
        }
        return true
    }

    async getAll(){
        const sql  = 'SELECT * FROM showtimes';
        return this.databaseServices.query(sql);
    }

    async getByID(id: number){
        const sql  = 'SELECT * FROM showtimes WHERE id = $1';
        return this.databaseServices.query(sql,[id]);
    }

    async createShowtime(movie: number, theater: string, start_time: string, end_time: string, price: number){
        if (await this.validateNoOverlapping(theater, start_time, end_time)){
            const params = [movie, theater, start_time, end_time, price]
            const sql  = 'INSERT INTO showtimes (movieId, theater, start_time, end_time, price) VALUES ($1, $2, $3, $4, $5)';
            return this.databaseServices.query(sql,params);
        }
        throw new HttpException('overlapping with other showtime', HttpStatus.BAD_REQUEST);
    }

    async updateShowtime(id: number, movie: number, theater: string, start_time: string, end_time: string, price: number){
        if (await this.validateNoOverlapping(theater, start_time, end_time)){
        const params = [id, movie, theater, start_time, end_time, price]
        const sql  = 'UPDATE showtimes SET movieId = $2, theater = $3, start_time = $4, end_time = $5, price = $6 WHERE id = $1 RETURNING *;';
        return this.databaseServices.query(sql,params);
        }
        throw new HttpException('overlapping with other showtime', HttpStatus.BAD_REQUEST);
    }

    async deleteShowtime(id: number){
        const sql = 'DELETE FROM showtimes WHERE id = $1'
        return this.databaseServices.query(sql,[id]);
    }
}

