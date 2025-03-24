import { Injectable, Param } from '@nestjs/common';
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class MoviesService {
    constructor(private readonly databaseServices: DatabaseService){
        this.createMoviesTableIfNotExists();
    }
  
    private async createMoviesTableIfNotExists() {
      await this.databaseServices.query(
        `DROP TABLE IF EXISTS movies`
      )  
      await this.databaseServices.query(
        `
        CREATE TABLE IF NOT EXISTS movies (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          genre VARCHAR(255) NOT NULL,
          duration FLOAT NOT NULL,
          rating FLOAT NOT NULL,
          releaseYear INT NOT NULL
        );
      `);
    }

    async getAllMovies(){
        const sql = 'SELECT * FROM movies';
        return this.databaseServices.query(sql);
    }

    async createMovie(title: string, genre: string, duration: number, rating: number, release_year: number){
        const params = [title, genre, duration, rating, release_year]
        const sql  = 'INSERT INTO movies (title, genre, duration, rating, release_year) VALUES ($1, $2, $3, $4, $5)';
        return this.databaseServices.query(sql,params);
    }

    async updateMovie(prevTitle: string, title: string, genre: string, duration: number, rating: number, release_year: number){
      const params = [prevTitle, title, genre, duration, rating, release_year]
        const sql  = `UPDATE movies SET title = $2, genre = $3, duration = $4, rating = $5, release_year = $6
                      WHERE title = $1 RETURNING *;`;
        return this.databaseServices.query(sql, params);
    }

    async delete(title: string){
      const sql = `DELETE FROM movies WHERE title = $1`
      return this.databaseServices.query(sql,[title]);
    }
}
