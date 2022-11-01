import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmstareasService {
  public api:string=`http://localhost:3000/`;
  constructor(
    private http:HttpClient
  ) { }

  getProcessys():Observable<any>{
    return (this.http.get<any>(`${this.api}processys`));
  }
  postProcessys():Observable<any>{
    return (this.http.post<any>(`${this.api}processys`,''));
  }
  
  
  getProcess():Observable<any>{
    return (this.http.get<any>(`${this.api}process`));
  }
  getProcessById(id:number):Observable<any>{
    return (this.http.get<any>(`${this.api}process/${id}`));
  }
  delProcess(id:number):Observable<any>{
    return (this.http.delete<any>(`${this.api}process/${id}`));
  }

  
  
  getCatalogue():Observable<any>{
    return (this.http.get<any>(`${this.api}catalogue`));
  }
  postCatalogue(name:string):Observable<any>{
    return (this.http.post<any>(`${this.api}catalogue`,{name}));
  }

  delCatalogue(id:number):Observable<any>{
    return (this.http.delete<any>(`${this.api}catalogue/${id}`));
  }




}
