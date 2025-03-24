import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShowtimeDto } from "./dto/showtime.dto";
import { ShowtimesService } from "./showtimes.service";

@Controller('showtimes')
export class ShowtimesController {
    constructor(private readonly showtimesService: ShowtimesService){}

    @Get('all')
    async findAll() {
        return this.showtimesService.getAll();
    }

    @Get(':showtimeId')
    async getByid(@Param('showtimeId') showtimeId : number) {
        return this.showtimesService.getByID(showtimeId);
    }

    @Post()
    create(@Body() ShowtimeDto : ShowtimeDto) {
        const { movieId, theater, start_time, end_time, price } = ShowtimeDto
        return this.showtimesService.createShowtime(movieId,theater,start_time,end_time,price);
    }

    @Post('/update/:showtimeId')
    update(@Param('showtimeId') showtimeId : number, @Body() ShowtimeDto : ShowtimeDto) {
        const { movieId, theater, start_time, end_time, price } = ShowtimeDto
        return this.showtimesService.updateShowtime(showtimeId, movieId,theater,start_time,end_time,price);
    }

    @Delete(':showtimeId')
    delete(@Param('showtimeId') showtimeId : number){
        return this.showtimesService.deleteShowtime(showtimeId);
    }


    // @Post(':movieTiltle')
    // update(@Param('movieTiltle') movieTiltle: string, @Body() movieDto : MovieDto) {
    //     console.log(movieTiltle)
    //     const {title, genre, duration, rating, releaseYear } = movieDto
    //     return this.movieService.updateMovie(movieTiltle,title,genre,duration,rating,releaseYear);
    // }

    // @Delete(':movieTitle')
    // delete(@Param('movieTitle') movieTitle: string){
    //     return this.movieService.delete(movieTitle)
    // }
}
