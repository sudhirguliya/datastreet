import { Component } from '@angular/core';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  // lineChart
  public types = [ 'type1', 'type2', 'type3' ];
  public types2 = [ 'type4', 'type5', 'type6' ];
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [-50, -450, 100];
  public doughnutChartType: string = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType: string = 'radar';

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [-300, 500, 100];
  public pieChartType: string = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 150, 100, 40, 820];
  public polarAreaLegend: boolean = true;

  public polarAreaChartType: string = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  callType(value){
    if(value=='type1')
    {
     this.barChartData = [
    {data: [80, 90, 22, 81, 79, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
    }
    if(value=='type2')
    {
     this.barChartData = [
    {data: [80, 90, 80, 81, 56, 28, 78], label: 'Series A'},
    {data: [40, 50, 60, 40, 63, 27, 36], label: 'Series B'}
    ];
    }
    if(value=='type3')
    {
     this.barChartData = [
    {data: [30, 90, 80, 20, 71, 37, 85], label: 'Series A'},
    {data: [10, 15, 40, 50, 23, 27, 90], label: 'Series B'}
    ];
    }
    if(value=='type4')
    {
     this.barChartData = [
    {data: [30, 90, 80, 20, 22, 37, 85], label: 'Series A'},
    {data: [10, 15, 40, 44, 66, 27, 90], label: 'Series B'}
    ];
    }
    if(value=='type5')
    {
     this.barChartData = [
    {data: [77, 90, 60, 20, 22, 21, 77], label: 'Series A'},
    {data: [10, 15, 90, 50, 22, 11, 90], label: 'Series B'}
    ];
    }
    if(value=='type6')
    {
     this.barChartData = [
    {data: [30, 60, 80, 20, 71, 37, 88], label: 'Series A'},
    {data: [10, 75, 40, 50, 23, 27, 90], label: 'Series B'}
    ];
    }
  }

}
