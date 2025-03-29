export class Paginacao{
    public page!: number;
    public size!: number;
    constructor(){
        this.page = 0;
        this.size = 10;
    }
}