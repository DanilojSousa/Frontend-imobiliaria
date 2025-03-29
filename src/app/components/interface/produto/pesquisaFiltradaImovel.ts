export class PesquisaFiltradaImovel{

    public ngcCodigo: number | null = null;
    public tpiCodigo: number[] | null = [];
    public stiCodigo: number[] | null = [];
    public valorMinimo: number | null = null;
    public valorMaximo: number | null = null;
    public areaTotalMinimo: number | null = null;
    public areaTotalMaximo: number | null = null;
    public cidCodigo: number | null = null;
    public endCodigo: number[] | null = [];
    public conCodigo: number[] | null = [];
    public imvDormitorio: number | null = null;
    public imvSuite: number | null = null;
    public imvGaragem: number | null = null;
    public imvAceitaFinanciamento: boolean | null = null;
    public imvMinhaCasaMinhaVida: boolean | null = null;
    public imvMobiliado: boolean | null = null;
    public lcpCodigo: number | null = null;
    public imvDestaque: boolean | null = null;
    public page: number;
    public size: number;
    public ordenar: string;
    constructor(){
        this.page = 0;
        this.size = 12;
        this.ordenar = "data desc";
    }
}