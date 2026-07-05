export{}
class Tarefa {
    titulo: string;
    descricao: string;
    concluida: boolean;
    dataCriacao: Date;
    cor:string;

    constructor(titulo: string, descricao: string) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.concluida = false;
        this.dataCriacao = new Date();
        this.cor = this.gerarCorAleatoria();
    }
    gerarCorAleatoria(): string {
        const cores = ["#EF4444","#F97316","#EAB308","#22C55E","#3B82F6","#8B5CF6","#EC4899","#14B8A6"];

        const indice = Math.floor(Math.random() * cores.length);

        return cores[indice];
    }
    DataFormatada(): string{
        return this.dataCriacao.toLocaleDateString('pt-BR'); //DD/MM/AAAA
    }
    HoraFormatada(): string{
        return this.dataCriacao.toLocaleTimeString('pt-BR',{ hour: '2-digit', minute: '2-digit'}) //HH:MM
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
        this.renderizar();
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
        this.renderizar();
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
        if (!this.listaTarefas || !this.contadorTarefas) 
            return;
        this.listaTarefas.innerHTML = '';
        this.listaDeTarefas.forEach((tarefa, index) => {
            const card = document.createElement('div');
            card.classList.add('tarefa-item');
            if (tarefa.concluida) {
                card.classList.add('concluida');
            }
            //titulo e descricao
            const conteudo = document.createElement('div')
            conteudo.classList.add('conteudo-tarefa')
            const titulo = document.createElement('h4');
            titulo.classList.add('titulo-tarefa');
            titulo.textContent = tarefa.titulo;
            const descricao= document.createElement('p');
            descricao.classList.add('descricao-tarefa');
            descricao.textContent = tarefa.descricao;

            //data e hora + icon
            const informacoes = document.createElement('div');
            informacoes.classList.add('info-tarefa');
            const data = document.createElement('div');
            data.classList.add('info-data');
            const hora = document.createElement('div')
            hora.classList.add('info-hora');
            const iconData = document.createElement('i');
            iconData.classList.add('bi', 'bi-calendar-event')
            const iconHora = document.createElement('i')
            iconHora.classList.add('bi', 'bi-clock')

            const txtData = document.createElement('p');
            txtData.classList.add('txtData');
            txtData.textContent = tarefa.DataFormatada();
            
            const txtHora = document.createElement('p');
            txtHora.classList.add('txtHora');
            txtHora.textContent = tarefa.HoraFormatada();

            //botão
            const btnExcluir = document.createElement('button');
            btnExcluir.classList.add('botao-excluir');
            const iconExcluir = document.createElement('i');
            iconExcluir.classList.add('bi', 'bi-trash3')
            btnExcluir.addEventListener("click", () => {
                this.deletarTarefa(index);
            })
            
            //checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            checkbox.checked = tarefa.concluida
            checkbox.addEventListener('click', () => {
                this.alternarStatusTarefa(index);
            })

            //circulo
            const circulo = document.createElement('i');
            circulo.classList.add('bi', 'bi-circle-fill');
            circulo.style.color = tarefa.cor;
            //circulo.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            
            //lados
            const ladoEsquerdo = document.createElement('div');
            ladoEsquerdo.classList.add('bloco-esquerdo')
            const ladoDireito = document.createElement('div');
            ladoDireito.classList.add('bloco-direito')
            
            //append
            ladoEsquerdo.appendChild(checkbox);
            ladoEsquerdo.appendChild(circulo);
            conteudo.appendChild(titulo);
            conteudo.appendChild(descricao);
            ladoEsquerdo.appendChild(conteudo);

            data.appendChild(iconData);
            data.appendChild(txtData);
            hora.appendChild(iconHora);
            hora.appendChild(txtHora);
            informacoes.appendChild(data);
            informacoes.appendChild(hora);
            ladoDireito.appendChild(informacoes);

            btnExcluir.appendChild(iconExcluir);
            ladoDireito.appendChild(btnExcluir);

            card.appendChild(ladoEsquerdo)
            card.appendChild(ladoDireito)

            this.listaTarefas.appendChild(card);
        });
        this.contadorTarefas.textContent = this.listaDeTarefas.length.toString();
    }
}
      new GerenciadorTarefas();  
