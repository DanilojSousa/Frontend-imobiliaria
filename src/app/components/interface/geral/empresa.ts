import { Contato } from "../pessoa/contato";
import { Email } from "../pessoa/email";
import { EnderecoDTO } from "../pessoa/endereco";
import { RedeSocial } from "../pessoa/redeSocial";
import { Situacao } from "../pessoa/situacao";

export class EmpresaDTO{

  public empCodigo!: number;
	public empRazaoSocial!: string;
  public empFantasia!: string;
	public empCnpj!: string;
	public empLogo!: string;
	public empIcone!: string;
  public empIe!: string;
  public redeSocial: RedeSocial;
  public contato: Contato;
  public email: Email;
  public situacao: Situacao;
  public endereco: EnderecoDTO;

  constructor(){
    this.redeSocial = new RedeSocial();
    this.contato = new Contato();
    this.email = new Email();
    this.situacao = new Situacao();
    this.endereco = new EnderecoDTO();
  }
}
