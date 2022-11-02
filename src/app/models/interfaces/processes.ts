export class Processes{
    id?:string;
    nombreDeImagen:string;
    PID: string;
    nombreDeSesion:string;
    numDeSesion: string;
    usoDeMemoria: string;
    estado:  string;
    nombreDeUsuario:  string;
    tiempoDeCpu:  string;
    tituloDeVentana:  string;
    quantum: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: any;
    Catalogue:{
        id:number;
        name:string;
        createdAt?:string;
        updatedAt?:string;
        deletedAt?:any;
    };
    constructor(
        id:string,
        nombreDeImagen:string,
        PID: string,
        nombreDeSesion:string,
        numDeSesion: string,
        usoDeMemoria: string,
        estado:  string,
        nombreDeUsuario:  string,
        tiempoDeCpu:  string,
        tituloDeVentana:  string,
        quantum: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: any,
        Catalogue:{
            id:number,
            name:string,
            createdAt:string,
            updatedAt:string,
            deletedAt:any,
        },
    ){
        this.id=id;
        this.nombreDeImagen = nombreDeImagen;
        this.PID = PID;
        this.nombreDeSesion = nombreDeSesion;
        this.numDeSesion = numDeSesion;
        this.usoDeMemoria = usoDeMemoria;
        this.estado = estado;
        this.nombreDeUsuario = nombreDeUsuario;
        this.tiempoDeCpu = tiempoDeCpu;
        this.tituloDeVentana = tituloDeVentana;
        this.quantum = quantum;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
        this.deletedAt=deletedAt;
        this.Catalogue=Catalogue

    }
}