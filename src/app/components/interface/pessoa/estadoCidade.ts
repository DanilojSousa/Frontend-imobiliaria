import { Cidade } from "./cidade";

export class EstadoCidade{
    public estCodigo!: number;
    public estDescricao!: string;
    public estSigla!: string;
    public cidade: Cidade[];

    constructor(){
        this.cidade = [];
    }
}
