export class Processys{
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
    prioridad:string;

    constructor(
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
        prioridad:string,
    ){
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
        this.prioridad=prioridad;
    }
}