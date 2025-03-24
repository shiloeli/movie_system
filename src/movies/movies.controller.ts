import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto'
import { MoviesService } from "./movies.service";

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService){}

    @Get('all')
    async findAll() {
        return this.movieService.getAllMovies();
    }

    @Post()
    create(@Body() movieDto : MovieDto) {
        const { title, genre, duration, rating, releaseYear } = movieDto
        return this.movieService.createMovie(title,genre,duration,rating,releaseYear);
    }

    @Post(':movieTiltle')
    update(@Param('movieTiltle') movieTiltle: string, @Body() movieDto : MovieDto) {
        const {title, genre, duration, rating, releaseYear } = movieDto
        return this.movieService.updateMovie(movieTiltle,title,genre,duration,rating,releaseYear);
    }

    @Delete(':movieTitle')
    delete(@Param('movieTitle') movieTitle: string){
        return this.movieService.delete(movieTitle)
    }
}

