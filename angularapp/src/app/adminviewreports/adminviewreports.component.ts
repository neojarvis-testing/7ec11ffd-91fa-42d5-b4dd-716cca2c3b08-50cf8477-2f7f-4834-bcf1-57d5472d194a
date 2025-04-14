import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { AppointmentService } from '../services/appointment.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-adminviewreports',
  templateUrl: './adminviewreports.component.html',
  styleUrls: ['./adminviewreports.component.css']
})
export class AdminviewreportsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }
  appointments: Appointment[] = [];
  selectedChart: string | null = null;

  // Bar Chart
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration['data']['datasets'] = [
    { data: [], label: 'Service Price', backgroundColor: [] }
  ];

  // Pie Chart
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartColors: any[] = [{ backgroundColor: [] }];

  // New Charts
  vehicleTypeChartLabels: string[] = [];
  vehicleTypeChartData: number[] = [];
  vehicleTypeChartType: ChartType = 'pie';
  vehicleTypeChartColors: any[] = [{ backgroundColor: [] }];

  locationChartLabels: string[] = [];
  locationChartData: number[] = [];
  locationChartType: ChartType = 'pie';
  locationChartColors: any[] = [{ backgroundColor: [] }];

  userRoleChartLabels: string[] = [];
  userRoleChartData: number[] = [];
  userRoleChartType: ChartType = 'pie';
  userRoleChartColors: any[] = [{ backgroundColor: [] }];

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
      this.updateCharts();
    });
  }

  updateCharts() {
    const serviceNames = this.appointments.map(a => a.service.serviceName);
    const servicePrices = this.appointments.map(a => a.service.servicePrice);
    const statusCounts = this.getStatusCounts();
    const vehicleTypeCounts = this.getVehicleTypeCounts();
    const locationCounts = this.getLocationCounts();
    

    // Update Bar Chart
    this.barChartLabels = serviceNames;
    this.barChartData[0].data = servicePrices;
    this.barChartData[0].backgroundColor = this.generateColors(servicePrices.length);

    // Update Pie Chart
    this.pieChartLabels = Object.keys(statusCounts);
    this.pieChartData = Object.values(statusCounts);
    this.pieChartColors[0].backgroundColor = this.generateColors(this.pieChartData.length);

    // Update Vehicle Type Chart
    this.vehicleTypeChartLabels = Object.keys(vehicleTypeCounts);
    this.vehicleTypeChartData = Object.values(vehicleTypeCounts);
    this.vehicleTypeChartColors[0].backgroundColor = this.generateColors(this.vehicleTypeChartData.length);

    // Update Location Chart
    this.locationChartLabels = Object.keys(locationCounts);
    this.locationChartData = Object.values(locationCounts);
    this.locationChartColors[0].backgroundColor = this.generateColors(this.locationChartData.length);

    
  }

  getStatusCounts() {
    const statusCounts: { [key: string]: number } = {};
    this.appointments.forEach(appointment => {
      if (statusCounts[appointment.status]) {
        statusCounts[appointment.status]++;
      } else {
        statusCounts[appointment.status] = 1;
      }
    });
    return statusCounts;
  }

  getVehicleTypeCounts() {
    const vehicleTypeCounts: { [key: string]: number } = {};
    this.appointments.forEach(appointment => {
      if (vehicleTypeCounts[appointment.service.typeOfVehicle]) {
        vehicleTypeCounts[appointment.service.typeOfVehicle]++;
      } else {
        vehicleTypeCounts[appointment.service.typeOfVehicle] = 1;
      }
    });
    return vehicleTypeCounts;
  }

  getLocationCounts() {
    const locationCounts: { [key: string]: number } = {};
    this.appointments.forEach(appointment => {
      if (locationCounts[appointment.location]) {
        locationCounts[appointment.location]++;
      } else {
        locationCounts[appointment.location] = 1;
      }
    });
    return locationCounts;
  }


  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`);
    }
    return colors;
  }

  selectChart(chart: string) {
    this.selectedChart = chart;
  }

  clearSelection() {
    this.selectedChart = null;
  }
}
