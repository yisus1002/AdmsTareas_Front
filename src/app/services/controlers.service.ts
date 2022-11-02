import { AdmstareasService } from 'src/app/services/admstareas.service';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { Processys } from '../models/interfaces/processys';
import { MatTableDataSource } from '@angular/material/table'; 
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ControlersService {

  public   datos: Processys[]=[];
  public options:number[]=[];
  public loading:boolean=false; 
  public catalogo:any;
  public catalogs:any[]=[];
  public forma !:FormGroup;

  dataSource= new MatTableDataSource<Processys>();
  
  
  constructor(private _sAdms: AdmstareasService,
    private toastr: ToastrService) {
    // this.listProcess();
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
        this.dataSource.data=this.datos; 
        this.options=[5,10,25, 100]
        this.options=[...this.options,(data?.body?.count)] 
      }),
      error: ((error:any)=>{
        this.showToastr_error((error?.message))  
      })
    })
  }
  ObtenerProccess(){
    this.loading=false;
    this._sAdms.postProcessys()
    .pipe(finalize(()=>{
      this.listProcess();
    }))
    .subscribe({
      next: ((data:any)=>{
        console.log(data)
      }),
      error: ((error:any)=>{
       this.showToastr_error((error?.message))  
      })
    })
  }

  crateCatalogue(name:object){
    this._sAdms.postCatalogue(name)
    .subscribe({
      next: ((data:any)=>{ 
        this.showToastr_success(data.message)
      }),
      error:((error:any)=>{
        this.showToastr_error((error?.message))  
      })
    })
  }

  edit(catalogo:any){ 
    this.catalogo=catalogo;
    this.forma.reset({
      name:this.catalogo.name
    })
  }

  loadCatalog(){
    this._sAdms.getCatalogue()
    .pipe(finalize(()=>{ 

    }))
    .subscribe({
      next: ((data:any)=>{  
        this.catalogs=data;
      }),
      error: ((error:any)=>{
        this.showToastr_error((error?.message))  
      })
    })
  }

  delete(id:number){
    this._sAdms.delCatalogue(id)
    .pipe(
      finalize(()=>{
        this.loadCatalog()
      })
    )
    .subscribe({
      next: ((data:any)=>{
        this.showToastr_success(data.message)
      }),
      error: ((error:any)=>{
        this.showToastr_error(error.message)
      })
    })
  }

  // toast ---------------------------
  showToastr_success(title:string){
    this.toastr.success(`${title}`)
  }
  showToastr_error(title:any){
    this.toastr.error(`${title}`)
  }
}