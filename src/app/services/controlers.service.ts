import { AdmstareasService } from 'src/app/services/admstareas.service';
import { Injectable,  AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Processys } from '../models/interfaces/processys';
import { MatTableDataSource } from '@angular/material/table'; 

@Injectable({
  providedIn: 'root'
})
export class ControlersService implements AfterViewInit {

  public   datos: Processys[]=[];
  public options:number[]=[];
  public loading:boolean=false; 

  dataSource= new MatTableDataSource<Processys>();
  
  
  constructor(private _sAdms: AdmstareasService) {
    // this.listProcess();
   }
  ngAfterViewInit(): void {
    
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  listProcess(){
    this.loading=false;
    this._sAdms.getProcessys()
    .pipe(finalize(()=>{
      this.loading=true;
    }))
    .subscribe({
      next: ((data:any)=>{ 
        this.datos=data?.body?.response;
        console.log(data);
        this.dataSource.data=this.datos; 
        this.options=[5,10,25, 100]
        this.options=[...this.options,(data?.body?.count)] 
        console.log(this.dataSource)
      }),
      error: ((error:any)=>{
        console.log(error);
      })
    })
  }
  ObtenerProccess(){
    this.loading=false;
    // this.options= this.options;
    this._sAdms.postProcessys()
    .pipe(finalize(()=>{
      this.listProcess();
    }))
    .subscribe({
      next: ((data:any)=>{
        console.log(data)
      }),
      error: ((error:any)=>{
        console.log(error);
      })
    })
  }

  crateCatalogue(name:object){
    this._sAdms.postCatalogue(name)
    .subscribe({
      next: ((data:any)=>{
        console.log(data)
      }),
      error:((error:any)=>{
        console.log(error)
      })
    })
  }
}
