interface Tarefa {
    titulo: string;
    descricao?: string;
    concluida: boolean;
    data: string;
    hora: string;
}
const formTarefa = document.getElementById('form-tarefa') as HTMLFormElement;
const inputTitulo = document.getElementById('titulo') as HTMLInputElement;
const txtDescricao = document.getElementById('descricao') as HTMLTextAreaElement;
const listaTarefas = document.getElementById('lista-tarefas') as HTMLDivElement;
const contadorTarefas = document.getElementById('contador-tarefas') as HTMLSpanElement