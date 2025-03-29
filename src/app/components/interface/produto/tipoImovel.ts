export class TipoImovel{

    public tpiCodigo!: number;
    public tpiDescricao!: string;
    public selecionado!: boolean;
    constructor(){
        this.selecionado = false;
    }
}