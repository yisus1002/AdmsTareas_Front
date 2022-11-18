import { AdmstareasService } from './../../services/admstareas.service';
import { ControlersService } from './../../services/controlers.service'; 
import { Component,  OnInit} from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  public processesSelectany:any[]=[];
  
  public formu !:FormGroup;
  public filtrar:any[]=[
    {cod: 'quantum', name: 'Sort by wholesale quantum'},
    {cod: 'tiempoDeCpu', name: 'Sort by wholesale cpu time'},
    {cod: 'usoDeMemoria', name: 'Sort by wholesale memory usage'},
    // {cod: '', name: ''},
  ];
  constructor( private _Adms: AdmstareasService,
              public _controService: ControlersService, 
              private form: FormBuilder,
              ) {   
                this.createFor();
  } 
  get nameNovalid(){return  this.formu.get('catalogueId')?.invalid && this.formu.get('catalogueId')?.touched;}


  ngOnInit(): void {
    this._controService.listProcess();
    this._controService.getCatalogs();
    // setTimeout(()=>{
      // this.ordenar('tiempoDeCpu');
    // },1000)
  }
  reloadProcessys(){
    this._controService.ObtenerProccess();
  }

  catalogSelect(mensaje:any){
    this.processesSelectany= mensaje 
    
  }

  createFor(){
    this.formu= this.form.group({
      catalogueId:["",[Validators.required],[]]
    })
  }
  submit(){  
    
    if(this.formu.invalid){
      return Object.values(this.formu.controls).forEach(controls=>{
        controls.markAllAsTouched();
      })
    }else{
      this._Adms.postProcess(this._controService.seleccionProcess,this.formu.value?.catalogueId)
      .pipe()
      .subscribe({
        next : (data:any)=>{
          this._controService.showToastr_success(data.message);
        },
        error: (error:any)=>{
          this._controService.showToastr_error(error.message)
        }
      })
      this._controService.seleccionProcess=[]
      this._controService.selection.clear();
      this.loadfor()
    }
  }
  cancel(){
    this.loadfor()
    this._controService.seleccionProcess=[]
    this._controService.selection.clear();
  }
  loadfor(){
    this.formu.reset({
      catalogueId: '',
    })
  }


  ordenar(filtro:any){
    if(filtro==='quantum'){
      this._controService.dataSource.data=this._controService.dataSource.data.sort((a:any,b:any)=> b?.quantum-a?.quantum)
    }else if(filtro==='tiempoDeCpu'){
      this._controService.dataSource.data=this._controService.dataSource.data.sort((a:any,b:any)=> b?.tiempoDeCpu-a?.tiempoDeCpu)
    }else if(filtro==='usoDeMemoria'){
      this._controService.dataSource.data=this._controService.dataSource.data.sort((a:any,b:any)=> b?.usoDeMemoria-a?.usoDeMemoria)
    }
    
    return  console.log(this._controService.dataSource.data);
    // return console.log(da);
    
  }
}