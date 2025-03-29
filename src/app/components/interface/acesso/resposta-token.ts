export class RespostaToken{

    public token: string;
	  public usrCodigo: string;
	  public role: string;

    constructor(token:string, usrCodigo:string, role:string){
       this.token = token;
       this.usrCodigo = usrCodigo;
       this.role = role;
    }
}
