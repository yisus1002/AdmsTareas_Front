import { finalize } from 'rxjs';
import { Processes } from './../../models/interfaces/processes';
import { AdmstareasService } from './../../services/admstareas.service';
import { ControlersService } from './../../services/controlers.service';
import { Component, OnInit, ViewChild, AfterViewInit, DoCheck, } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalogs-detail',
  templateUrl: './catalogs-detail.component.html',
  styleUrls: ['./catalogs-detail.component.scss']
})
export class CatalogsDetailComponent implements OnInit, AfterViewInit, DoCheck {
    displayedColumns:string[]=[	
                            "nombreDeImagen",
                            "PID",
                            "nombreDeSesion",
                            "numDeSesion",
                            "usoDeMemoria",
                            "estado",
                            "nombreDeUsuario",
                            "tiempoDeCpu",
                            "tituloDeVentana",
                            "quantum",
                            "options"
                          ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource= new MatTableDataSource<Processes>();
  public options:number[]=[3,5,10,25];
  public id_Catalog!:number;
  public id_processes!:number;
  public catalogDetail:any;
  public forma !:FormGroup;

// --------------------------------------------------------------///

  simulacion:any[]=[];
  round:boolean=false;
  report:boolean=false;
  paused:boolean=true;
  max:number=0;
  cont:number=-1;
  proceAux:any[]=[];


  constructor( 
    public _sContr: ControlersService,
    private _sAdms: AdmstareasService,
    private activateRoute:ActivatedRoute,
    private form: FormBuilder,
  ) { 
    this.activateRoute.params.subscribe((params:any)=>{ 
      this.id_Catalog=parseInt(params['id'])
      this.getCatalog(parseInt(params['id']))
    })

    this.createFor();
    
   
  }
  ngDoCheck(): void {}

  ngOnInit(): void {
     this._sContr.getCatalogs();
  }

  getCatalog(id:number){
    this._sAdms.getCataloogueById(id)
    .pipe(finalize(()=>{
      this.simulated();
    }))
    .subscribe({
      next: ((data:any)=>{ 
        this.catalogDetail=data;
        this.dataSource.data=data?.Processes; 
      }),
      error: ((error)=>{
        this._sContr.showToastr_error((error.message));
      })
    })
  }
  changeCatalog(){ 
    const obj = this.forma.value;
    obj.Catalogue={id:this.forma.value?.catalogueId} 
    this._sAdms.putProcess(this.id_processes,obj)
    .pipe(
      finalize(()=>{
        this.getCatalog(this.id_Catalog)
      })
    )
    .subscribe({
      next: (data:any)=>{
        this._sContr.showToastr_success(data.message)
      },
      error: (error:any)=>{
        this._sContr.showToastr_error(error.message)
      }
    })
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletProcess(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      position: 'top-end',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._sAdms.delProcess(id)
        .pipe(finalize(()=>{
            this.getCatalog(this.id_Catalog)
          }))
        .subscribe({
          next: ((data:any)=>{
            this._sContr.showToastr_success(data?.message);
          }),
          error: ((error:any)=>{
            this._sContr.showToastr_error(error?.message)
          })
        })
      }
    })
  }

  createFor(){
    this.forma= this.form.group({
      catalogueId:[[""],[],[]]
    })
  }
  loadForm(catalogueId:number, idprocesses:number){
    this.forma.reset({
      catalogueId:catalogueId,
    })
    this.id_processes=idprocesses; 
    
  }
  simulated(){
    this.proceAux=[];
    this.max=0;
    const simulador2 = (processesPrioridad:Processes[], listo:any[]) => {
      let resp:any[] = [];
      processesPrioridad.forEach((element,idx) => {
          resp.push(...listo)
          let rafaga = (Math.floor(Math.random() * (5000-1000+1)) +1000) * element?.nombreDeImagen.length;
          let condicion = 1;
          let cadena = element.nombreDeImagen.substr(0,Number(element.quantum)*condicion);
          do {
            cadena = element.nombreDeImagen.substr(0,Number(element.quantum)*condicion);
            resp.push({
              ...element,
              estado: 'ejecucion',
              cadena,
              ejecucion: condicion,
              tiempoLLegada: idx,
              rafaga,
            })
            condicion++;
          } while ( cadena !== element?.nombreDeImagen)
            resp.push({
              ...element,
              estado: 'terminado',
              cadena,
              ejecuciones: condicion-1,
              tiempoLLegada: idx,
              tiempoFinalizacion: idx+(rafaga/1000),
              rafaga,
              turnaround: (idx+(rafaga/1000)) - idx
            })
            listo.splice(0,1)
      });
      return resp;
    }
    const processesPrioridad:any[] = this.dataSource.data.sort((a:any,b:any)=> b.prioridad-a.prioridad)
    const processLIsto             = this.dataSource.data.sort((a:any,b:any)=> b.prioridad-a.prioridad).map((element)=> { return {...element, estado: 'listo'} });
    const resultado                = simulador2(processesPrioridad, processLIsto) ;
    let   filtrar                  = (pid:any)=>resultado.filter((ele)=>parseInt(ele?.PID)===parseInt(pid));
    const mayorNumero              = () => resultado.filter(element => element.estado === 'terminado');

    let termi:any[]    = mayorNumero();
 
    for(let i =0; i< termi.length; i ++){ 
     let aux = filtrar(termi[i]?.PID);
         this.proceAux.push(aux)
     if(this.max < aux.length) {
      this.max = aux.length;
     }
     
   } 
   console.log(this.proceAux);
  }
  simular(){
    this.round=true;

    let tiempo        = 1;
    let muestra:any[] = [];

    let id            = setInterval(()=>{
    this.cont ++;
    if((this.max > this.cont)&& (this.paused===false)){ 
      muestra=[]
      this.simulacion=muestra;
      for(let i =0; i< this.proceAux.length; i ++){
        if(this.proceAux[i][this.cont]){  
          muestra.push(this.proceAux[i][this.cont]);
          this.simulacion=muestra;
        }else{
          muestra.push(this.proceAux[i][this.proceAux[i].length -1]);
          this.simulacion=muestra;

        }
        
      }
      console.clear();
      console.table(muestra);
      
      
      console.log(this.cont);
    } else if(this.max < this.cont){
      clearInterval(id)
      console.log('Terminado');
      this.simulacion=muestra; 
      this.report=true;
      console.table(this.simulacion); 
      
    }else if(this.paused===true){
      clearInterval(id)
      this.report=false; 
      this.cont=this.cont;
    }if((this.max < this.cont)&& (this.paused===true)){
      clearInterval(id)
      console.log('Terminado');
      console.log(this.cont);
      
      this.simulacion=muestra; 
      this.report=true;
      console.table(this.simulacion); 
    }
  
    
   },2000*tiempo)
   this.paused=!this.paused;
  }
  reset(){
    this.report=false;
    this.round=false;
    this.simulacion=[];
    this.proceAux=[];
    this.cont=-1;
    this.max=0;
    this.paused=!this.paused;
    this.simulated();
  }

}
