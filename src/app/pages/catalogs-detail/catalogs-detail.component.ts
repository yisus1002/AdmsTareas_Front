import { finalize, map } from 'rxjs';
import { Processes } from './../../models/interfaces/processes';
import { AdmstareasService } from './../../services/admstareas.service';
import { ControlersService } from './../../services/controlers.service';
import { Component, OnInit, ViewChild, AfterViewInit, } from '@angular/core';
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
export class CatalogsDetailComponent implements OnInit, AfterViewInit {
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
  public catalog: any[] = [];

  
  constructor( 
    private _sContr: ControlersService,
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

  ngOnInit(): void {
     this.getCatalogs();
  }

  getCatalog(id:number){
    this._sAdms.getCataloogueById(id)
    .pipe()
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
  getCatalogs(){
    this._sAdms.getCatalogue() 
    .subscribe({
      next: (data:any[])=>{ 
        const da = data.map(({id, name})=>({'id':id, 'name':name})) 
        this.catalog=da;
      },
      error:(error:any)=>{
        this._sContr.showToastr_error(error.message)
      }       
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


}
