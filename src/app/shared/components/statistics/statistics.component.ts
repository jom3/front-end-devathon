import {
  AfterViewInit,
  Component,
  inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../modules/material/material.module';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  bookingSvc = inject(BookingService);
  displayedColumns: string[] = [
    'avatar',
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
      r = r.sort((a: any, b: any) => b.bookingID - a.bookingID);
      this.dataSource.data = r;
    });
    this.dataSource.paginator = this.paginator;
  }

  public downloadAsPDF() {
    var prepare: any[][] = [];
    // Create a new PDF document.
    const doc = new jsPDF();

    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('Ocean Drive Cinemas', 10, 10);
    doc.setFontSize(12);
    doc.text('Listado de reservas confirmadas.', 10, 20);

    // Create a table using `jspdf-autotable`.
    const headers = [this.displayedColumns];

    this.dataSource.data.forEach((element: any) => {
      prepare.push([
        element.fullName,
        element.bookingID,
        element.nbutaca,
        element.estado,
        element.monto,
        element.title,
        element.freserva,
        element.horapelicula,
      ]);
    });

    autoTable(doc, {
      head: headers,
      body: prepare,
      startY: 30, // Adjust the `startY` position as needed.
    });

    // Save the PDF.
    doc.save('table.pdf');
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

export const compare = (a: any, b: any) => {
  if (a.bookingID < b.bookingID) {
    return -1;
  }
  if (a.bookingID > b.bookingID) {
    return 1;
  }
  return 0;
};
