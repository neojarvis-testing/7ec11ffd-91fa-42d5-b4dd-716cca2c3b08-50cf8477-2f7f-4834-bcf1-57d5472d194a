import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { AuthService } from '../services/auth.service';
import * as QRCode from 'qrcode';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-userviewappointment',
  templateUrl: './userviewappointment.component.html',
  styleUrls: ['./userviewappointment.component.css']
})
export class UserviewappointmentComponent implements OnInit, AfterViewInit, OnDestroy {
  appointments: Appointment[] = [];
  selectedStatus: string = "All";
  inp: string = "";
  userId: number | null = null;
  selectedIndex: number | null = null;
  upiUrl: string = "";
 
  showPaymentPopup = false;
  paymentCode: string = '';
  showConfirmationPopup = false;
 
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;
 
  // Subscriber container for managing the subscriptions
  private subscriptions: Subscription = new Subscription();
 
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.userId = parseInt(this.authService.getUserId(), 10);
    this.getAppointments();
  }
 
  ngAfterViewInit(): void {
    console.log("View initialized");
  }
 
  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
 
  // Fetch all appointments for the user
  public getAppointments(): void {
    const sub = this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
      this.appointments = data;
    });
    this.subscriptions.add(sub);
  }
 
  // Fetch appointments based on the selected status filter
  public getAppointmentsByFilter(): void {
    if (this.selectedStatus === 'All') {
      this.getAppointments();
    } else {
      const sub = this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
        this.appointments = data.filter(a => a.status === this.selectedStatus);
      });
      this.subscriptions.add(sub);
    }
  }
 
  // Search appointments based on text input
  public searchData(): void {
    const sub = this.appointmentService.getAppointmentsByUser(this.userId).subscribe(data => {
      this.getAppointments();
      this.appointments = data.filter(b =>
        JSON.stringify(b).toLowerCase().includes(this.inp.toLowerCase())
      );
    });
    this.subscriptions.add(sub);
  }
 
  // Generates a random payment code with 6 alphanumeric characters
  public generatePaymentCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }
 
  // Initiates the payment process by generating a payment code and QR code
  public async payNow(index: number): Promise<void> {
    this.paymentCode = this.generatePaymentCode();
    this.selectedIndex = index;
    this.showPaymentPopup = true;
 
    // Wait for the view to update before generating the QR code
    await new Promise(resolve => setTimeout(resolve, 500));
    this.generateQrCode();
  }
 
  // Generates a QR code using the UPI URL
  public generateQrCode(): void {
    const upiId = 'aditya.jay.gupta23@okaxis';
    const money = this.appointments[this.selectedIndex!]?.service?.servicePrice;
    const randomTid = Math.floor(100000000 + Math.random() * 900000000).toString();
    this.upiUrl = `upi://pay?pa=${upiId}&pn=AdityaGupta&mc=0000&tid=${randomTid}&tr=987654321&tn=Payment&am=${money}&cu=INR`;
 
    console.log('Generated UPI URL:', this.upiUrl); // Debug log
 
    // Delay to ensure the canvas is ready
    setTimeout(() => {
      if (this.qrCanvas?.nativeElement) {
        QRCode.toCanvas(this.qrCanvas.nativeElement, this.upiUrl, error => {
          if (error) {
            console.error('Error generating QR code:', error);
          } else {
            console.log('QR code generated successfully');
          }
        });
      } else {
        console.error("QR Canvas is not initialized yet");
      }
    }, 1000);
  }
 
  // Handles the completion of the payment
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
 
      const sub = this.appointmentService.addPayment(paymentDetails).subscribe(
        paymentResponse => {
          console.log('Payment processed successfully:', paymentResponse);
          this.showPaymentPopup = false;
          this.showConfirmationPopup = true;
        },
        paymentError => {
          console.error('Error processing payment:', paymentError);
        }
      );
      this.subscriptions.add(sub);
    }
  }
 
  // Closes the confirmation popup
  public closeConfirmation(): void {
    this.showConfirmationPopup = false;
  }
 
 
  public feedback(id: number): void {
    this.router.navigate(['/useraddfeedback', id]);
}
 
}