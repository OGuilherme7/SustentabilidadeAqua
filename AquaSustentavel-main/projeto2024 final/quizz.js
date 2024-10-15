const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $buttonBack = document.querySelector(".button-back")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $buttonBack.classList.add("hide")
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
    <a href="index.html">
        <button class="button button-back">Voltar</button>
    </a>
  `

  const cookieUsuariosJson = document.cookie.match(/usuarios=\[.*\]/)?.[0].match(/\[.*\]/)[0];
  const usuarios = cookieUsuariosJson&&JSON.parse(cookieUsuariosJson);
  const usuarioLogado = usuarios?usuarios.find(usuario => usuario.logado):undefined;
  usuarioLogado.quizz = {totalCorrect, totalQuestions, message};
}

const questions = [
  {
    question: "Por que a conservação da água é fundamental para a sustentabilidade ambiental?",
    answers: [
      { text: "Para aumentar a poluição.", correct: false },
      { text: "Para promover o desperdício.", correct: false },
      { text: "Para preservar ecossistemas.", correct: true },
      { text: "Para aumentar o consumo de energia.", correct: false }
    ]
  },
  {
    question: "Qual é a porcentagem de água potável disponível na Terra?",
    answers: [
      { text: "2,5%", correct: true },
      { text: "25%", correct: false },
      { text: "3,0%", correct: false },
      { text: "50%", correct: false }
    ]
  },
  {
    question: "Quais são algumas práticas diárias que ajudam a economizar água em casa?",
    answers: [
      { text: "Consertar vazamentos.", correct: true },
      { text: "Tomar banho longos.", correct: false },
      { text: "Deixar a torneira aberta.", correct: false },
      { text: "Usar mangueira para limpar.", correct: false }
    ]
  },
  {
    question: "Qual é o impacto da poluição da água sobre a saúde pública e o meio ambiente?",
    answers: [
      { text: "Afeta a saúde de seres vivos.", correct: true },
      { text: "Melhora a qualidade do ar.", correct: false },
      { text: "Aumenta a biodiversidade.", correct: false },
      { text: "Não tem impacto significativo.", correct: false }
    ]
  },
  {
    question: "Cite uma tecnologia que pode ajudar a reduzir o desperdício de água em indústrias.",
    answers: [
      { text: "Uso de sistemas de irrigação por gotejamento.", correct: true },
      { text: "Tanques de água não tratados.", correct: false },
      { text: "Descarte de água em rios.", correct: false },
      { text: "Aumento de vazamentos.", correct: false }
    ]
  },
  {
    question: "Qual é a principal fonte de poluição das águas nos centros urbanos?",
    answers: [
      { text: "Descarte inadequado de resíduos sólidos.", correct: true },
      { text: "Atividades agrícolas.", correct: false },
      { text: "Vazamento de petróleo.", correct: false },
      { text: "Reservatórios naturais.", correct: false }
    ]
  },
  {
    question: "Qual é uma das consequências do desmatamento para os recursos hídricos?",
    answers: [
      { text: "Aumento da infiltração de água.", correct: false },
      { text: "Redução da evapotranspiração.", correct: false },
      { text: "Aumento da erosão do solo.", correct: true },
      { text: "Melhora na qualidade da água.", correct: false }
    ]
  },
  {
    question: "Como a agricultura pode impactar a qualidade da água?",
    answers: [
      { text: "Uso de pesticidas e fertilizantes.", correct: true },
      { text: "Cultivo de plantas nativas.", correct: false },
      { text: "Irrigação com água da chuva.", correct: false },
      { text: "Redução do uso de água.", correct: false }
    ]
  },
  {
    question: "Qual é a importância dos wetlands (terras úmidas) na conservação da água?",
    answers: [
      { text: "Eles servem como depósitos de resíduos.", correct: false },
      { text: "Eles filtram poluentes da água.", correct: true },
      { text: "Eles aumentam a temperatura da água.", correct: false },
      { text: "Eles reduzem a biodiversidade.", correct: false }
    ]
  },
  {
    question: "Qual é o efeito da mudança climática sobre os recursos hídricos?",
    answers: [
      { text: "Aumenta a disponibilidade de água em todas as regiões.", correct: false },
      { text: "Causa secas e inundações mais severas.", correct: true },
      { text: "Reduz a evaporação.", correct: false },
      { text: "Melhora a qualidade da água.", correct: false }
    ]
  },
];

  
