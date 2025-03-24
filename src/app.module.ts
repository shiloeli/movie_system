import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './movies/movies.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [DatabaseModule, MoviesModule, ShowtimesModule, BookingsModule]
})
export class AppModule {}
