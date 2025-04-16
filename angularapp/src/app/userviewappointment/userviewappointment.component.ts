import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { AuthService } from '../services/auth.service';

import * as QRCode from 'qrcode';


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
  upiUrl : string ="";

  showPaymentPopup = false;
  paymentCode: string = '';
  showConfirmationPopup = false;

  @ViewChild('qrCanvas', { static: true }) qrCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private appointmentService: AppointmentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = parseInt(this.authService.getUserId());
    this.getAppointments();
  }

  public ngAfterViewInit(): void {
    console.log("View initialized");
  }

  public getAppointments() {
    this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
      this.appointments = data;
    });
  }

  public getAppointmentsByFilter() {
    if (this.selectedStatus === 'All') {
      this.getAppointments();
    } else {
      this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
        this.appointments = data.filter(a => a.status === this.selectedStatus);
      });
    }
  }

  public searchData() {
    this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
      this.appointments = data.filter(b => JSON.stringify(b).toLowerCase().includes(this.inp.toLowerCase()));
    });
  }

  public generatePaymentCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }

  public payNow(index: number): void {
    this.paymentCode = this.generatePaymentCode();
    this.selectedIndex = index;
    this.showPaymentPopup = true;

    setTimeout(() => this.generateQrCode(), 0); // Replace dummy generator with new QR logic
  }

  public generateQrCode(): void {
    const upiId = 'aditya.jay.gupta23@okaxis';
    const money = 1;
  
    const randomTid = Math.floor(100000000 + Math.random() * 900000000).toString();
    const upiUrl = `upi://pay?pa=${upiId}&pn=AdityaGupta&mc=0000&tid=${randomTid}&tr=987654321&tn=Payment&am=${money}&cu=INR`;
  
    console.log('Generated UPI URL:', upiUrl); // Debugging log
  
    QRCode.toCanvas(this.qrCanvas.nativeElement, upiUrl, error => {
      if (error) {
        console.error('Error generating QR code:', error);
      } else {
        console.log('QR code generated successfully');
      }
    });
  }
  

  public handlePaymentDone(): void {
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

        this.showPaymentPopup = false;
        this.showConfirmationPopup = true;
      }, paymentError => {
        console.error('Error processing payment:', paymentError);
      });
    }
  }

  public closeConfirmation(): void {
    this.showConfirmationPopup = false;
  }
}
