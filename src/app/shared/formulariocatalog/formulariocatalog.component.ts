import { finalize } from 'rxjs';
import { AdmstareasService } from 'src/app/services/admstareas.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ControlersService } from 'src/app/services/controlers.service';
import { Router, Event, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-formulariocatalog',
  templateUrl: './formulariocatalog.component.html',
  styleUrls: ['./formulariocatalog.component.scss']
})
export class FormulariocatalogComponent implements OnInit {

  @Input() namefor!:string;
  currentRoute?:string;


  constructor( public _controService: ControlersService,
    private _sAdms:AdmstareasService,
    private form: FormBuilder,
    public router: Router,
    ) { 
      this.createForm(); 
      this.verificarRuta();
    }

    get nameNovalid(){return  this._controService.forma.get('name')?.invalid && this._controService.forma.get('name')?.touched;}

    ngOnInit(): void { 
    } 
    createForm(){
      this._controService.forma = this.form.group({
        name: ["", [Validators.required, Validators.minLength(4)], []]
      })
    }
    createCata(){
      if(this._controService.forma.invalid){
        return Object.values(this._controService.forma.controls).forEach(controls=>{
          controls.markAllAsTouched();
        })
      }else{
        if(this.currentRoute==='/home'){ 
          this._controService.crateCatalogue(this._controService.forma.value);
          this.loadForm('');
        }else if(this.currentRoute==="/catalogs"){ 
          // this.loadForm(this.forma.value?.name) 
          this.editCatalog(this._controService.catalogo?.id, this._controService.forma.value)
          this.loadForm('');
        }
      }
    }
    loadForm(name:string){
      this._controService.forma.reset({
        name: name
      })
    }
    editCatalog(id:number, name:object){ 
      this._sAdms.putCatalogue(id, name)
      .pipe(finalize(()=>{
        this._controService.loadCatalog()
      }))
      .subscribe({
        next:((data:any)=>{ 
          this._controService.showToastr_success(data.message);
        }),
        error:((error:any)=>{
          this._controService.showToastr_error((error?.message))
        })
      })
    }

    verificarRuta(){
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url; 
      }
      });
    }

}