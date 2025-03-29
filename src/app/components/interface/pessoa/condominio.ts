import { EnderecoDTO } from "./endereco";

export class Condominio{

    public conCodigo!: number;
    public conDescricao!: string;
    public endereco: EnderecoDTO;

    constructor(){
        this.endereco = new EnderecoDTO();
    }
  }
