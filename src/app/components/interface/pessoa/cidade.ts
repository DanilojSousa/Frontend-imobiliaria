import { Estado } from "./estado";

export class Cidade{

    public cidCodigo!: number;
    public cidDescricao!: string;
    public estado!: Estado;
    
    constructor(){
        this.estado = new Estado();
    }
}