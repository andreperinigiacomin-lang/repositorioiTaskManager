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
        return this.dataCriacao.toLocaleDateString('pt-BR',{ hour: '2-digit', minute: '2-digit'})
    }
}




//const formTarefa = document.getElementById('form-tarefa') as HTMLFormElement;
//const inputTitulo = document.getElementById('titulo') as HTMLInputElement;
//const txtDescricao = document.getElementById('descricao') as HTMLTextAreaElement;
//const listaTarefas = document.getElementById('lista-tarefas') as HTMLDivElement;
//const contadorTarefas = document.getElementById('contador-tarefas') as HTMLSpanElement;

//let tarefas: Tarefa[] = [];

//function obterHora(): {data: string; hora: string}{
    //const agora = new Date()
    //const data = agora.toLocaleTimeString('pt-BR');
    //const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})
    //return {data, hora}
//}
//function renderizarTela(): void{
    //if(!listaTarefas||!contadorTarefas){
        //return;
   // }
   // listaTarefas.innerHTML = '';
    //tarefas.forEach((tarefa, index) => {
       // const tarefaItem = document.createElement('div');
       // tarefaItem.classList.add('tarefa-item');
       // if (tarefa.concluida) {
          //  tarefaItem.classList.add('concluida');
       // }
   // }
//}