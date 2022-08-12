import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as chartData from './../../../shared/data/dashboard/default';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { StatisticsService } from '../../../shared/httpClient/statistics/statistics.service';
import { SolicitudesService } from '../../../shared/httpClient/solicitudes.service';
import { Router } from '@angular/router';
import * as knobData from '../../../shared/data/chart/knob';

import {
  ChartComponent
} from "ng-apexcharts";

declare let require: any;

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {

  // Chart Data
  public chart1 = chartData.chartBox1;
  public chart2 = chartData.chartBox2;
  public chart3 = chartData.chartBox3;
  public mapChart = chartData.mapChart.options;
  public smallChart = chartData.smallChart;

  estadisticasGuias = {creadas: "", actualizadas: "", guiasCreadas: []};
  estadisticasSolicitudes = {};
  categoriasSolicitudes;

  meses = ["January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "Octuber ", "November ", "December "];
  month: String;
  totalGuias = 1;
  rows = [];
  temp = [];
  actualizaciones = 0;
  capacitaciones = 0;
  inquietudes = 0;

  //Table
  columns = [{ name: 'radicado', label: 'N°', size: 1 }, { name: 'Fecha', label: 'Fecha' }, { name: 'Solicitante', label: 'Solicitante' }, { name: 'Area', label: 'Área' }, { name: 'Solicitud', label: 'Solicitud' }, { name: 'Estado', label: 'Estado' } ];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;

  @ViewChild("chart") chart: ChartComponent;

  @ViewChild('actual', { static: false }) public divActual: ElementRef;
  @ViewChild('capac', { static: false }) public divCapaci: ElementRef;
  @ViewChild('inqu', { static: false }) public divInquie: ElementRef;
  
  

  public chartOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        },
      }
    },
    series: [
    ],
    yaxis: {
      show: false,
      "labels": {
        "formatter": function (val) {
            return val.toFixed(0)
        }
      },
      showGrid: false,
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: '#f0f7fa',
      show: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      showGrid: false,
      show: false,
      type: 'date',
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: {},
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    },
    colors: ["#fb740d", "#158df7", "#fb2e63","#51bb25"],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.4,
        stops: [0, 95, 100]
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          stroke: {
            width: 5
          },
          chart: {
            height: 200
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          stroke: {
            width: 1
          }
        }
      },
      {
        breakpoint: 320,
        options: {
          stroke: {
            width: 1
          }
        }
      }
    ]
  };

  //ChartOptions2

  public chart2Options = {
    
    series: [
      {
          name: "Materias",
          data: [44, 55, 57]
      },
      {
          name: "Guias",
          data: [76, 85, 101]
      },
  ],
  chart: {
      type: "bar",
      height: 350
  },
  plotOptions: {
      bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
      }
  },
  dataLabels: {
      enabled: false
  },
  stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
  },
  xaxis: {
      categories: [
          "Creadas",
          "Actualizadas",
          "En Proceso"
      ]
  },
  yaxis: {
      title: {
          text: "Total"
      }
  },
  colors:["#fb740d", "#158df7", '#51bb25'],
  fill: {
      opacity: 1
  },
  tooltip: {
      y: {
          formatter: function (val) {
              return val;
          }
      }
  }
  };

  public exportForm1: FormGroup;
  public exportForm2: FormGroup;
  public exportForm3: FormGroup;
  model1D     : NgbDateStruct;
  model1H     : NgbDateStruct;
  model2D     : NgbDateStruct;
  model2H     : NgbDateStruct;
  model3D     : NgbDateStruct;
  model3H     : NgbDateStruct;

  constructor( public subjectsService: SubjectsService,
               private solicitudesService: SolicitudesService,
               private statisticsService: StatisticsService,
               private fb: FormBuilder, 
               public router: Router, ) { 

    let arrayCategorias = new Array();   
    let arrayRadicados = new Array();    
    let arrayProceso = new Array();    
    let arrayPendiente = new Array();    
    let arrayCerrado = new Array();  
    let actualizaciones, capacitaciones, inquietudes;     
    this.getEstadisticasChart1(data => {

    Object.keys(data.estadisticas).forEach(function (key){
      arrayRadicados.push(data.estadisticas[key][0].total);
      arrayProceso.push(data.estadisticas[key][1].total);
      arrayPendiente.push(data.estadisticas[key][2].total);
      arrayCerrado.push(data.estadisticas[key][3].total);
      arrayCategorias.push(key);
    });

    this.chartOptions = {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          },
        }
      },
      series: [
        {
          name: "Radicación",
          data: arrayRadicados
        },
        {
          name: "Proceso",
          data: arrayProceso
        },
        {
          name: "Pendiente",
          data: arrayPendiente
        },
        {
          name: "Cerrado",
          data: arrayCerrado
        }

      ],
      yaxis: {
        show: false,
        "labels": {
          "formatter": function (val) {
              return val.toFixed(0)
          }
        },
        showGrid: false,
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: '#f0f7fa',
        show: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        low: 0,
        offsetX: 0,
        offsetY: 0,
        showGrid: false,
        show: false,
        type: 'date',
        labels: {
          low: 0,
          offsetX: 0,
          show: false,
        },
        axisBorder: {
          low: 0,
          offsetX: 0,
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: arrayCategorias,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy'
        },
      },
      colors: ["#fb740d", "#158df7", "#fb2e63","#51bb25"],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.4,
          stops: [0, 95, 100]
        }
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            stroke: {
              width: 5
            },
            chart: {
              height: 200
            }
          }
        },
        {
          breakpoint: 480,
          options: {
            stroke: {
              width: 1
            }
          }
        },
        {
          breakpoint: 320,
          options: {
            stroke: {
              width: 1
            }
          }
        }
      ]
    };


     });

     this.getEstadisticasChart2(data => {
      this.chart2Options = {  
          series: [
            {
                name: "Materias",
                data: data.materias
            },
            {
                name: "Guías",
                data: data.guias 
            },
          ],
        chart: {
            type: "bar",
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
        },
        xaxis: {
            categories: [
                "Creadas",
                "Actualizadas",
                "En Proceso"
            ]
        },
        yaxis: {
            title: {
                text: "Total"
            }
        },
        colors:["#fb740d", "#158df7", '#51bb25'],
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        }
        };

     }); 

    this.getEstadisticasChart3(data => {

      Object.keys(data.tiposSolicitudes).forEach(function (key){
        if(data.tiposSolicitudes[key].tipo == "Actualizacion"){
          actualizaciones = data.tiposSolicitudes[key].total;
        }else if(data.tiposSolicitudes[key].tipo == "Capacitacion"){
          capacitaciones = data.tiposSolicitudes[key].total;
        }else if(data.tiposSolicitudes[key].tipo == "Inquietudes"){
          inquietudes = data.tiposSolicitudes[key].total;
        }
      });
  
      this.loadKnob(actualizaciones,capacitaciones,inquietudes);
  
    });

    let date = new Date();
    this.month = this.meses[date.getMonth()];
    
    this.getStadisticsGuias(data => {
      this.estadisticasGuias = data;
      this.totalGuias = data['guiasCreadas'].reduce((
        acc,
        obj,
      ) => acc += Number(obj.total), 0);  
    });
    this.getSolicitudes(data => {
      this.temp = [...data];  
      this.rows = data;
    });

  
  }

  ngOnInit(): void {
    this.exportForm1 = this.fb.group({
      fDesde: [''],
      fHasta: [''],
    });
    this.exportForm2 = this.fb.group({
      fDesde: [''],
      fHasta: [''],
    });
    this.exportForm3 = this.fb.group({
      fDesde: [''],
      fHasta: [''],
    });
  }

  getStadisticsGuias(dataComp){
    this.subjectsService.getEstadisticas().subscribe(
      data  => {
            dataComp(data);
         }
        );
  }


  getSolicitudes(dataComp){
    this.solicitudesService.getListSolicitudes().subscribe(
      data  => {
          dataComp(data);
         },
       error => {
          let prueba = [];
          dataComp(prueba);
       }  
       );   
  }

  viewRequest(e){
    this.router.navigate(['/request/view-request'], { queryParams: { id: e.radicado } });
  }



  getEstadisticasChart1(dataComp){
    let fDesde = "", fHasta = "";
    if(this.exportForm1 != null){
      fDesde = this.exportForm1.controls['fDesde'].value;
      fHasta = this.exportForm1.controls['fHasta'].value;
    }  
    this.statisticsService.getChart1Data(fDesde, fHasta).subscribe(
      data  => {
          dataComp(data);
         },
       error => {
          let prueba = [];
          dataComp(prueba);
       }  
       );   
  }

  getEstadisticasChart2(dataComp){
    let fDesde = "", fHasta = "";
    if(this.exportForm2 != null){
      fDesde = this.exportForm2.controls['fDesde'].value;
      fHasta = this.exportForm2.controls['fHasta'].value;
    }  
    this.statisticsService.getChart2Data(fDesde, fHasta).subscribe(
      data  => {
          dataComp(data);
         },
       error => {
          let prueba = [];
          dataComp(prueba);
       }  
       );   
  }




  getEstadisticasChart3(dataComp){
    let fDesde = "", fHasta = "";
    if(this.exportForm3 != null){
      fDesde = this.exportForm3.controls['fDesde'].value;
      fHasta = this.exportForm3.controls['fHasta'].value;
    } 
    this.statisticsService.getChart3Data(fDesde, fHasta).subscribe(
      data  => {
          dataComp(data);
         },
       error => {
          let prueba = [];
          dataComp(prueba);
       }  
       );   
  }

  filter(){

  }

  filterChart1(){
    let arrayCategorias = new Array();   
    let arrayRadicados = new Array();    
    let arrayProceso = new Array();    
    let arrayPendiente = new Array();    
    let arrayCerrado = new Array();   

    this.getEstadisticasChart1(data => {
      Object.keys(data.estadisticas).forEach(function (key){
        arrayRadicados.push(data.estadisticas[key][0].total);
        arrayProceso.push(data.estadisticas[key][1].total);
        arrayPendiente.push(data.estadisticas[key][2].total);
        arrayCerrado.push(data.estadisticas[key][3].total);
        arrayCategorias.push(key);
      });
  
      this.chartOptions = {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            },
          },
        },
        series: [
          {
            name: "Radicación",
            data: arrayRadicados
          },
          {
            name: "Proceso",
            data: arrayProceso
          },
          {
            name: "Pendiente",
            data: arrayPendiente
          },
          {
            name: "Cerrado",
            data: arrayCerrado
          }
  
        ],
        yaxis: {
          show: false,
          "labels": {
            "formatter": function (val) {
                return val.toFixed(0)
            }
          },
          showGrid: false,
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          borderColor: '#f0f7fa',
          show: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          low: 0,
          offsetX: 0,
          offsetY: 0,
          showGrid: false,
          show: false,
          type: 'date',
          labels: {
            low: 0,
            offsetX: 0,
            show: false,
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false,
          },
          axisTicks: {
            show: false,
          },
          categories: arrayCategorias,
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
        colors: ["#fb740d", "#158df7", "#fb2e63","#51bb25"],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.4,
            stops: [0, 95, 100]
          }
        },
        responsive: [
          {
            breakpoint: 992,
            options: {
              stroke: {
                width: 5
              },
              chart: {
                height: 200
              }
            }
          },
          {
            breakpoint: 480,
            options: {
              stroke: {
                width: 1
              }
            }
          },
          {
            breakpoint: 320,
            options: {
              stroke: {
                width: 1
              }
            }
          }
        ]
      };
  
       });
  }


  filterChart2(){
    this.getEstadisticasChart2(data => {
      this.chart2Options = {  
          series: [
            {
                name: "Materias",
                data: data.materias
            },
            {
                name: "Guías",
                data: data.guias 
            },
          ],
        chart: {
            type: "bar",
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
        },
        xaxis: {
            categories: [
                "Creadas",
                "Actualizadas",
                "En Proceso"
            ]
        },
        yaxis: {
            title: {
                text: "Total"
            }
        },
        colors:["#fb740d", "#158df7", '#51bb25'],
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        }
        };
      });
  }

  filterChart3(){
    let actualizaciones = 0, capacitaciones = 0, inquietudes = 0;     
    this.getEstadisticasChart3(data => {
      Object.keys(data.tiposSolicitudes).forEach(function (key){
        if(data.tiposSolicitudes[key].tipo == "Actualizacion"){
          actualizaciones = data.tiposSolicitudes[key].total;
        }else if(data.tiposSolicitudes[key].tipo == "Capacitacion"){
          capacitaciones = data.tiposSolicitudes[key].total;
        }else if(data.tiposSolicitudes[key].tipo == "Inquietudes"){
          inquietudes = data.tiposSolicitudes[key].total;
        }
      });
      
      this.divActual.nativeElement.removeChild(this.divActual.nativeElement.childNodes[0]);
      this.divCapaci.nativeElement.removeChild(this.divCapaci.nativeElement.childNodes[0]);
      this.divInquie.nativeElement.removeChild(this.divInquie.nativeElement.childNodes[0]);

      this.loadKnob(actualizaciones,capacitaciones,inquietudes);
  
    });
  }


  loadKnob(actualizaciones, capacitaciones, inquietudes){

    //document.getElementById('actual').removeChild();
    let Knob = require('knob');
    let knobA = Knob({
      className: "review",
      value: actualizaciones,
      angleOffset: 90,
      thickness: 0.1,
      width: 120,
      cursor: true,
      fgColor: "#8fd1be",
      readOnly: true,
      bgColor: '#8fd1be',
      lineCap: 'round',
      displayPrevious: false
    })
    document.getElementById('actual').append(knobA);

    let knobC = Knob({
      className: "review",
      value: capacitaciones,
      angleOffset: 90,
      thickness: 0.1,
      width: 120,
      cursor: true,
      fgColor: "#99a9a5",
      readOnly: true,
      bgColor: '#99a9a5',
      lineCap: 'round',
      displayPrevious: false
    })
    document.getElementById('capac').append(knobC);

    let knobI = Knob({
      className: "review",
      value: inquietudes,
      angleOffset: 90,
      thickness: 0.1,
      width: 120,
      cursor: true,
      fgColor: "#f1c445",
      readOnly: true,
      bgColor: '#f1c445',
      lineCap: 'round',
      displayPrevious: false
    })
    document.getElementById('inqu').append(knobI);
  }

}
