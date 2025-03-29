export class SituacaoImovel{
    public stiCodigo!: number;
    public stiDescricao!: string;
    public selecionado: boolean;
    constructor(){
        this.selecionado = false;
    }
}