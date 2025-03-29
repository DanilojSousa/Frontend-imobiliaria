import { Cidade } from "./cidade";

export class EnderecoDTO{
    public endCodigo!: number;
    public endEndereco!: string;
    public endComplemento!: string;
    public endNumero!: string;
    public endCep!: string;
    public endBairro!: string;
    public cidade: Cidade;

    constructor(){
        this.cidade = new Cidade();
    }
}
