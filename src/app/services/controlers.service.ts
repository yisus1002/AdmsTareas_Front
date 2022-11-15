import { AdmstareasService } from 'src/app/services/admstareas.service';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { Processys } from '../models/interfaces/processys';
import { MatTableDataSource } from '@angular/material/table'; 
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class ControlersService {

  public   datos  : Processys[]=[];
  public options  : number[]=[];
  public loading  : boolean=false; 
  public catalogo : any;
  public catalogs : any[]=[];
  
  public catalog: any[] = [];
  public forma !:FormGroup;

  dataSource= new MatTableDataSource<Processys>();
  public selection = new SelectionModel<Processys>(true, []);
  public seleccionProcess:any[]=[];

  constructor(private _sAdms: AdmstareasService,
    private toastr: ToastrService) {
    // this.listProcess();
   }
 

  listProcess(){
    this.loading=false;
    this._sAdms.getProcessys()
    .pipe(finalize(()=>{
      this.loading=true;
      const da =this.dataSource.data.map(({PID, estado, nombreDeImagen, nombreDeSesion,nombreDeUsuario, numDeSesion, quantum, tiempoDeCpu, tituloDeVentana, usoDeMemoria, prioridad})=>({
        'PID':PID,
        'estado':estado,
        'nombreDeImagen':nombreDeImagen,
        'nombreDeSesion':nombreDeSesion,
        'nombreDeUsuario':nombreDeUsuario,
        'numDeSesion':numDeSesion,
        'quantum':quantum,
        'tiempoDeCpu':(tiempoDeCpu.length > 7)? ((parseInt(tiempoDeCpu.substring(0, 2))*3600)+(parseInt(tiempoDeCpu.substring(3, 5))*60)+(parseInt(tiempoDeCpu.substring(6, 8))) ).toString(): ((parseInt(tiempoDeCpu[0])*3600)+(parseInt(tiempoDeCpu.substring(2, 4))*60)+(parseInt(tiempoDeCpu.substring(5, 7))) ).toString(),
        'tituloDeVentana':tituloDeVentana,
        'prioridad':prioridad,
        'usoDeMemoria':usoDeMemoria.substring(0,(usoDeMemoria.length -2)),
      }));
      this.dataSource.data=da;
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
    .pipe(finalize(()=>{
      this.getCatalogs()
    }))
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
    })

  }

  // toast ---------------------------
  showToastr_success(title:string){
    this.toastr.success(`${title}`)
  }
  showToastr_error(title:any){
    this.toastr.error(`${title}`)
  }

  getCatalogs(){
    this._sAdms.getCatalogue() 
    .subscribe({
      next: (data:any[])=>{ 
        const da = data.map(({id, name})=>({'id':id, 'name':name})) 
        this.catalog=da;
      },
      error:(error:any)=>{
        this.showToastr_error(error.message)
      }       
    })
  }

}