export{}
class Tarefa {
    titulo: string;
    descricao: string;
    concluida: boolean;
    dataCriacao: Date;

    constructor(titulo: string, descricao: string) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.concluida = false;
        this.dataCriacao = new Date();
    }
    DataFormatada(): string{
        return this.dataCriacao.toLocaleDateString('pt-BR');
    }
    HoraFormatada(): string{
        return this.dataCriacao.toLocaleTimeString('pt-BR',{ hour: '2-digit', minute: '2-digit'})
    }
}
class GerenciadorTarefas {
    listaDeTarefas: Tarefa[] = [];
    inputTitulo = document.getElementById('titulo') as HTMLInputElement;
    formTarefa = document.getElementById('form-tarefa') as HTMLFormElement;
    txtDescricao = document.getElementById('descricao') as HTMLTextAreaElement;
    listaTarefas = document.getElementById('lista-tarefas') as HTMLDivElement;
    contadorTarefas = document.getElementById('contador-tarefas') as HTMLSpanElement;

    constructor(){
        this.inicializarEventos();
    }
    inicializarEventos(): void{
        if(this.formTarefa){
            this.formTarefa.addEventListener('submit', (event: SubmitEvent) => {
                event.preventDefault();
                this.adicionarNovaTarefa();
            })
        }
    }
    adicionarNovaTarefa(): void{
        if(!this.inputTitulo || !this.txtDescricao || !this.formTarefa){
            return;
        }
        const tituloDigitado = this.inputTitulo.value.trim();
        const descricaoDigitada = this.txtDescricao.value.trim();
        if (tituloDigitado === ''){
            return;
        }
        const novaTarefa = new Tarefa(tituloDigitado, descricaoDigitada);
        this.listaDeTarefas.push(novaTarefa);
        //this.renderizar();
        this.formTarefa.reset();

        
    }
    alternarStatusTarefa(index: number): void {
        if (this.listaDeTarefas[index]) {
            this.listaDeTarefas[index].concluida = !this.listaDeTarefas[index].concluida;
            this.renderizar();
        }
    }
    deletarTarefa(index: number): void {
        this.listaDeTarefas.splice(index, 1);
        this.renderizar();
    }
    renderizar(): void {
        if (!this.listaTarefasContainer || !this.contadorTarefas) return;
        this.listaTarefasContainer.innerHTML = '';
        this.listaDeTarefas.forEach((tarefa, index) => {
            const card = document.createElement('div');
            card.classList.add('tarefa-item');
            if (tarefa.concluida) {
                card.classList.add('concluida');
            }
        }
