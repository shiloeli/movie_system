import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from "./bookings.service";
import { BookingDto } from "./dto/booking.dto";

@Controller('bookings')
export class BookingsController {
    constructor(private readonly BookingsService: BookingsService){}

    @Post()
    async book(@Body() bookingDto : BookingDto) {
        const {showtimeId, seatNumber, userId} = bookingDto
        return this.BookingsService.bookTicket(showtimeId, seatNumber, userId);
    }
}
