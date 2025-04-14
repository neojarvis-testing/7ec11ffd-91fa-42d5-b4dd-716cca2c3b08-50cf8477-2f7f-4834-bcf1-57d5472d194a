import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-userviewappointment',
  templateUrl: './userviewappointment.component.html',
  styleUrls: ['./userviewappointment.component.css']
})

export class UserviewappointmentComponent implements OnInit, AfterViewInit {

  appointments: Appointment[] = [];
  selectedStatus: string = "All";
  inp: string = "";
  userId: number | null;
  selectedIndex: number | null = null;

  // Payment variables
  showPaymentPopup = false;
  paymentCode: string = '';
  showConfirmationPopup = false;

  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private appointmentService: AppointmentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = parseInt(this.authService.getUserId());
    this.getAppointments();
  }

  ngAfterViewInit(): void {
    console.log("View initialized");
  }

  getAppointments() {
    this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
      this.appointments = data;
    });
  }

  getAppointmentsByFilter() {
    if (this.selectedStatus === 'All') {
      this.getAppointments();
    } else {
      this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
        this.appointments = data.filter(a => a.status === this.selectedStatus);
      });
    }
  }

  searchData() {
    this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
      this.appointments = data.filter(b => JSON.stringify(b).toLowerCase().includes(this.inp.toLowerCase()));
    });
  }

  generatePaymentCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }

  payNow(index: number): void {
    this.paymentCode = this.generatePaymentCode();
    this.selectedIndex = index;
    this.showPaymentPopup = true;

    setTimeout(() => this.createDummyQRCode(300), 0);
  }

  createDummyQRCode(size: number) {
    if (!this.qrCanvas) {
      console.error('Canvas not initialized');
      return;
    }

    const canvas = this.qrCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not available!');
      return;
    }

    canvas.width = size;
    canvas.height = size;
    const gridSize = 30;
    const cellSize = size / gridSize;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#FFF';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  handlePaymentDone(): void {
    if (this.selectedIndex !== null) {
      const selectedAppointment = this.appointments[this.selectedIndex];
      const paymentDate = new Date().toISOString();

      const paymentDetails = {
        username: this.authService.getUsername(),
        paymentCode: this.paymentCode,
        totalPayment: selectedAppointment.service.servicePrice,
        user: { userId: this.userId },
        paymentDate: paymentDate
      };

      console.log('Payment Data Being Sent:', paymentDetails);

      this.appointmentService.addPayment(paymentDetails).subscribe(paymentResponse => {
        console.log('Payment processed successfully:', paymentResponse);
        
        // After successful payment, send an email confirmation

        this.showPaymentPopup = false;
        this.showConfirmationPopup = true;
      }, paymentError => {
        console.error('Error processing payment:', paymentError);
      });
    }
  }


  closeConfirmation(): void {
    this.showConfirmationPopup = false;
  }
}
