import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { DatabaseModule } from "src/database/database.module";
import { BookingsController } from "./bookings.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [BookingsController],
    providers: [BookingsService]
})
export class BookingsModule {}
