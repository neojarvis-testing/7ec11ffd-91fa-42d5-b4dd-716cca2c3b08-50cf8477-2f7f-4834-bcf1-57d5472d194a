import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { AppointmentService } from '../services/appointment.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-adminviewreports',
  templateUrl: './adminviewreports.component.html',
  styleUrls: ['./adminviewreports.component.css']
})
export class AdminviewreportsComponent implements OnInit {

  appointments: Appointment[] = [];
  selectedChart: string | null = null;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  // Bar Chart
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,  // Ensures labels start from 0
            stepSize: 1         // Force labels to use whole numbers
          },
        },
      ],
    },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Services', backgroundColor: [] }
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
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartColors: Color[] = [{ backgroundColor: [] }];

  // New Charts
  vehicleTypeChartLabels: Label[] = [];
  vehicleTypeChartData: number[] = [];
  vehicleTypeChartType: ChartType = 'pie';
  vehicleTypeChartColors: Color[] = [{ backgroundColor: [] }];

  locationChartLabels: Label[] = [];
  locationChartData: number[] = [];
  locationChartType: ChartType = 'pie';
  locationChartColors: Color[] = [{ backgroundColor: [] }];

  userRoleChartLabels: Label[] = [];
  userRoleChartData: number[] = [];
  userRoleChartType: ChartType = 'pie';
  userRoleChartColors: Color[] = [{ backgroundColor: [] }];

  // Line Chart for Number of Services Booked
  public servicesByDateOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,  // Ensures labels start from 0
          stepSize: 1         // Force labels to use whole numbers
        },
        scaleLabel: {
          display: true,
          labelString: 'Number of Services'
        }
      }]
    }
  };
  public servicesByDateLabels: Label[] = [];
  public servicesByDateType: ChartType = 'line';
  public servicesByDateLegend = true;
  public servicesByDateData: ChartDataSets[] = [{
    data: [],
    label: 'Number of Services Booked',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
    fill: false
  }];

  public loadAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
      console.log('Appointments:', this.appointments); // Debugging line
      this.updateCharts();
      this.processAppointmentData();
    });
  }

  public updateCharts() {
    const serviceCounts = this.getCounts(this.appointments.map(a => a.service.serviceName));
    console.log('Service Counts:', serviceCounts); // Debugging line
    const statusCounts = this.getCounts(this.appointments.map(a => a.status));
    const vehicleTypeCounts = this.getCounts(this.appointments.map(a => a.service.typeOfVehicle));
    const locationCounts = this.getCounts(this.appointments.map(a => a.location));

    // Update Bar Chart
    this.barChartLabels = Object.keys(serviceCounts);
    this.barChartData[0].data = Object.values(serviceCounts);
    this.barChartData[0].backgroundColor = this.generateColors(Object.keys(serviceCounts).length);

    // Update Pie Chart
    this.pieChartLabels = Object.keys(statusCounts);
    this.pieChartData = Object.values(statusCounts);
    this.pieChartColors[0].backgroundColor = this.generateColors(Object.keys(statusCounts).length);

    // Update Vehicle Type Chart
    this.vehicleTypeChartLabels = Object.keys(vehicleTypeCounts);
    this.vehicleTypeChartData = Object.values(vehicleTypeCounts);
    this.vehicleTypeChartColors[0].backgroundColor = this.generateColors(Object.keys(vehicleTypeCounts).length);

    // Update Location Chart
    this.locationChartLabels = Object.keys(locationCounts);
    this.locationChartData = Object.values(locationCounts);
    this.locationChartColors[0].backgroundColor = this.generateColors(Object.keys(locationCounts).length);
  }

  public processAppointmentData() {
    const servicesByDate: { [key: string]: number } = {};

    this.appointments.forEach(appointment => {
      const date = new Date(appointment.appointmentDate).toISOString().split('T')[0];

      if (!servicesByDate[date]) servicesByDate[date] = 0;
      servicesByDate[date] += 1;
    });

    const sortedDates = Object.keys(servicesByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.servicesByDateLabels = sortedDates;
    this.servicesByDateData[0].data = sortedDates.map(date => servicesByDate[date]);
  }

  public getCounts(arr: string[]): { [key: string]: number } {
    return arr.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  public generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`);
    }
    return colors;
  }

  public selectChart(chart: string) {
    this.selectedChart = chart;
  }

  public clearSelection() {
    this.selectedChart = null;
  }
}
