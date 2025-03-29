import { EnderecoDTO } from '../pessoa/endereco';
import { Contato } from '../pessoa/contato';
import { Email } from '../pessoa/email';
import { RedeSocial } from '../pessoa/redeSocial';
import { Situacao } from '../pessoa/situacao';
import { EmpresaDTO } from '../geral/empresa';

export class Usuario{

    public usrCodigo!: number;
    public usrNascimento!: Date;
    public usrNome!: string;
    public usrLogin!: string;
    public usrPassword!: string;
    public usrImagem!: string;
    public usrCpf!: string;
    public situacao: Situacao;
    public id_google!: string;
    public endereco!: EnderecoDTO;
    public contato: Contato;
    public email: Email;
    public redeSocial: RedeSocial;
    public roles!: string;
    public empresa: EmpresaDTO;
    public usrCreci!: string;

    constructor(){
        this.situacao = new Situacao();
        this.endereco = new EnderecoDTO();
        this.email = new Email();
        this.contato = new Contato();
        this.redeSocial = new RedeSocial();
        this.empresa = new EmpresaDTO();
    }
}
