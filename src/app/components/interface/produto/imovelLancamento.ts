import { Usuario } from '../acesso/usuario';
import { EnderecoDTO } from '../pessoa/endereco';
import { Negocio } from './negocio';
import { SituacaoImovel } from './situacaoImovel';
import { TipoImovel } from './tipoImovel';
export class ImovelLancamento{

    public imvCodigo!: number;
    public imvDescricao!: string;
    public imvData!: Date;
    public imvValor!: number;
    public imvDormitorio!: number;
    public imvBanheiro!: number;
    public imvSuite!: number;
    public imvGaragem!: number;
    public imvSalaEstar!: number;
    public imvSalaJantar!: number;
    public imvCozinha!: number;
    public imvAreaServico!: number;
    public imvGaragemCoberta!: boolean;
    public imvBanheira!: boolean;
    public imvPiscina!: boolean;
    public imvHidromassagem!: boolean;
    public imvOfuro!: boolean;
    public imvAreaConstruida!: number;
    public imvAreaTotal!: number;
    public imvObservacao!: string;
    public imvDestaque!: boolean;
    public imvEscriturado!: boolean;
    public imvAverbado!: boolean;
    public imvAceitaFinanciamento!: boolean;
    public negocio: Negocio;
    public tipoImovel: TipoImovel;
    public endereco: EnderecoDTO;
    public usuario: Usuario;
    public situacaoImovel: SituacaoImovel;
    public imgCodigo!: number;

    constructor(){
        this.negocio = new Negocio();
        this.tipoImovel = new TipoImovel();
        this.endereco = new EnderecoDTO();
        this.usuario = new Usuario();
        this.situacaoImovel = new SituacaoImovel();
    }
}
