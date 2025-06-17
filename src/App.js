import './App.css';

import perguntas from './data/questions.json'
import scores from './data/scores.json'
import mascote from './images/mascote.png'

import { useState, useEffect } from 'react';
import { Trophy, Heart, Award, Star } from 'lucide-react';

const images = require.context('./images/questions', true);
const imageList = images.keys().map(image => images(image));

console.log(imageList)
// Componente principal do Quiz
export default function App() {
  // Estados para controlar o quiz
  const [etapaAtual, setEtapaAtual] = useState('inicio');
  const [pontuacao, setPontuacao] = useState(0);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [nomeJogador, setNomeJogador] = useState('');
  const [mensagemFeedback, setMensagemFeedback] = useState('');
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(15);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [teclaAtiva, setTeclaAtiva] = useState('');
  const [lideranca, setLideranca] = useState(scores);
  const [imgIndex, setImgIndex] = useState(0);

  // Efeito para controlar o cronômetro
  useEffect(() => {
    let intervalo;

    if (cronometroAtivo && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0 && cronometroAtivo) {
      handleResposta(-1); // Tempo esgotado
    }

    return () => clearInterval(intervalo);
  }, [cronometroAtivo, tempoRestante]);

  // Manipulador de eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (etapaAtual !== 'quiz' || mostrarFeedback) return;

      const key = e.key.toUpperCase();

      // Verificar se a tecla pressionada é A, B, C ou D
      if (key === 'A' || key === 'B' || key === 'C' || key === 'D') {
        // Converter a letra em índice (A=0, B=1, C=2, D=3)
        const indice = key.charCodeAt(0) - 65;

        // Verificar se o índice é válido para as opções disponíveis
        if (indice >= 0 && indice < perguntas[perguntaAtual].opcoes.length) {
          setTeclaAtiva(key);

          // Um pequeno atraso para mostrar a tecla que foi pressionada antes de processar a resposta
          setTimeout(() => {
            handleResposta(indice);
            setTeclaAtiva('');
          }, 200);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [etapaAtual, perguntaAtual, mostrarFeedback]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log("Pressed " + event.key + " at " + etapaAtual)
      if (etapaAtual === "inicio") {
        console.log("X")
        iniciarQuiz()
      } else if (etapaAtual === "quiz") {
        const KEYS = "abcd";
        const idx = KEYS.indexOf(event.key.toLowerCase());
        if (idx >= 0) {
          handleResposta(idx);
        }
      } else if (etapaAtual === "liderança") { } else { }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [etapaAtual]);

  // Iniciar o quiz
  const iniciarQuiz = () => {
    setEtapaAtual('quiz');
    setPontuacao(0);
    setPerguntaAtual(0);
    setTempoRestante(15);
    setCronometroAtivo(true);
  };

  // Salvar pontuação
  const salvarPontuacao = () => {
    if (nomeJogador.trim() === '') {
      alert('Por favor, digite seu nome!');
      return;
    }

    const novaLideranca = [...lideranca, { nome: nomeJogador, pontos: pontuacao }]
      .sort((a, b) => b.pontos - a.pontos)
      .slice(0, 5);

    setLideranca(novaLideranca);
    setEtapaAtual('lideranca');
  };

  // Lidar com resposta selecionada
  function handleResposta(indiceResposta) {
    setCronometroAtivo(false);

    const pergunta = perguntas[perguntaAtual];

    if (indiceResposta === -1) {
      setMensagemFeedback("Tempo esgotado! Vamos para a próxima pergunta.");
    } else if (indiceResposta === pergunta.respostaCorreta) {
      setPontuacao(pontuacao + 20);
      setMensagemFeedback(`Correto! ${pergunta.explicacao}`);
    } else {
      setMensagemFeedback(`Ops! A resposta correta era: ${pergunta.opcoes[pergunta.respostaCorreta]}. ${pergunta.explicacao}`);
    }

    setMostrarFeedback(true);

    setTimeout(() => {
      setMostrarFeedback(false);

      if (perguntaAtual < perguntas.length - 1) {
        setImgIndex((imgIndex + 1) % imageList.length);
        setPerguntaAtual(perguntaAtual + 1);
        setTempoRestante(15);
        setCronometroAtivo(true);
      } else {
        setEtapaAtual('final');
      }
    }, 3000);
  };

  // Resetar o quiz
  function reiniciarQuiz() {
    setEtapaAtual('inicio');
    setPontuacao(0);
    setPerguntaAtual(0);
    setNomeJogador('');
  };

  // Tela de início
  if (etapaAtual === 'inicio') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Quiz da Vacinação</h1>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 flex items-center justify-center bg-blue-100 rounded-full">
                <img src={ mascote } alt="Mascote da Vacinação" className="w-36 h-36" />
              </div>
              <div className="absolute -right-2 -top-2 w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <p className="text-lg mb-6">
            Olá! Vamos aprender sobre vacinas de um jeito divertido?
            Teste seus conhecimentos e veja quem consegue a maior pontuação!
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="bg-green-100 p-3 rounded-lg flex items-center">
              <Heart className="text-red-500 mr-2" />
              <span>Proteja-se</span>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg flex items-center">
              <Award className="text-purple-500 mr-2" />
              <span>Ganhe pontos</span>
            </div>
          </div>

          <button
            onClick={ iniciarQuiz }
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg transition-colors shadow-md"
          >
            COMEÇAR AVENTURA!
          </button>
        </div>
      </div>
    );
  }

  // Tela do quiz
  if (etapaAtual === 'quiz') {
    const pergunta = perguntas[perguntaAtual];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-blue-100 px-4 py-2 rounded-lg">
              <span className="font-bold text-blue-600">Pergunta { perguntaAtual + 1 }/{ perguntas.length }</span>
            </div>
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-1" />
              <span className="font-bold">{ pontuacao } pontos</span>
            </div>
          </div>

          <div className="mb-4 bg-blue-500 h-2 rounded-full">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={ { width: `${(tempoRestante / 15) * 100}%` } }
            ></div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-2">{ pergunta.pergunta }</h2>
            <div className="flex justify-center">
              <img src={ imageList[imgIndex] } alt="Ilustração da pergunta" className="h-32 rounded-lg my-2" />
            </div>
          </div>

          <div className="bg-yellow-100 p-3 rounded-lg mb-4 text-center">
            <p>Para responder use o mouse ou digite as teclas <strong>A, B, C, D</strong> no teclado!</p>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-4">
            {
              pergunta.opcoes.map((opcao, indice) => {
                const letra = String.fromCharCode(65 + indice);
                const isActive = teclaAtiva === letra;

                return (
                  <button
                    key={ indice }
                    onClick={ () => handleResposta(indice) }
                    className={ `p-3 border-2 rounded-lg text-left transition-colors ${isActive
                      ? 'bg-blue-200 border-blue-500'
                      : 'bg-white border-blue-300 hover:bg-blue-50'
                      }` }
                  >
                    <span className={ `inline-block w-6 h-6 mr-2 text-white rounded-full text-center ${isActive ? 'bg-blue-600' : 'bg-blue-500'
                      }` }>
                      { letra }
                    </span>
                    { opcao }
                  </button>
                );
              }
              )
            }
          </div>

          { mostrarFeedback && (
            <div className={ `p-4 rounded-lg mb-4 ${mensagemFeedback.startsWith('Correto') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}` }>
              { mensagemFeedback }
            </div>
          ) }
        </div>
      </div>
    );
  }

  // Tela final
  if (etapaAtual === 'final') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Quiz Concluído!</h1>

          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 flex items-center justify-center bg-yellow-100 rounded-full">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              <div className="absolute -right-2 -top-2 w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <p className="text-xl font-bold mb-2">Você fez { pontuacao } pontos!</p>
          <p className="mb-6">Parabéns por aprender sobre a importância das vacinas!</p>

          <div className="mb-4">
            <label className="block text-left mb-2">Digite seu nome:</label>
            <input
              type="text"
              value={ nomeJogador }
              onChange={ (e) => setNomeJogador(e.target.value) }
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Seu nome aqui"
            />
          </div>

          <button
            onClick={ salvarPontuacao }
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg transition-colors shadow-md mb-3"
          >
            SALVAR PONTUAÇÃO
          </button>
        </div>
      </div>
    );
  }

  // Tela de liderança
  if (etapaAtual === 'lideranca') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Top Vacinadores!</h1>

          <div className="mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-left">Posição</th>
                  <th className="p-2 text-left">Nome</th>
                  <th className="p-2 text-right">Pontos</th>
                </tr>
              </thead>
              <tbody>
                { lideranca.map((jogador, indice) => (
                  <tr
                    key={ indice }
                    className={ `${jogador.nome === nomeJogador ? 'bg-yellow-50' : indice % 2 === 0 ? 'bg-gray-50' : ''}` }
                  >
                    <td className="p-3">
                      { indice === 0 ? (
                        <Trophy className="text-yellow-500 w-5 h-5" />
                      ) : (
                        `${indice + 1}º`
                      ) }
                    </td>
                    <td className="p-3 font-medium">{ jogador.nome }</td>
                    <td className="p-3 text-right font-bold">{ jogador.pontos }</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-blue-700">
              Lembre-se: Vacinas são importantes para proteger você e todas as pessoas ao seu redor!
            </p>
          </div>

          <button
            onClick={ reiniciarQuiz }
            className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-lg transition-colors shadow-md"
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </div>
    );
  }

  return <p className="text-center p-4">Carregando Quiz...</p>;
}


