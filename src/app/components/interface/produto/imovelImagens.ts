import { Imagens } from "./imagens";

export class ImovelImagens{
    public imvCodigo!: number;
    public imagens!: Imagens[];
    constructor(){
        this.imagens = [];
    }
}