import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../modules/material/material.module';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements AfterViewInit {
  bookingSvc = inject(BookingService);
  displayedColumns: string[] = [
    'fullName',
    'bookingID',
    'nbutaca',
    'estado',
    'monto',
    'title',
    'freserva',
    'horapelicula',
  ];
  dataSource = new MatTableDataSource<PayedBooking>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.bookingSvc.getConfirmedBookings().subscribe((r: any) => {
      this.dataSource.data = r;
    });
    this.dataSource.paginator = this.paginator;
  }
}

export interface PayedBooking {
  fullName: string;
  bookingID: number;
  nbutaca: string;
  estado: string;
  monto: number;
  title: string;
  freserva: string;
  horapelicula: string;
}
