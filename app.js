// app.js
// OTEL auto instrumentation 초기화를 위해 tracing.js를 가장 먼저 불러옵니다.
require('./instrumentation');

const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

// 3가지 중 하나를 임의로 선택하는 함수
function getRandomChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// 플레이어 선택과 서버 선택을 비교하여 승패를 판단하는 함수
function judge(playerChoice, botChoice) {
  if (playerChoice === botChoice) {
    return `비겼습니다! 당신과 서버 모두 ${playerChoice}를 선택했습니다.`;
  }
  // 승리 조건: rock > scissors, scissors > paper, paper > rock
  if (
    (playerChoice === 'rock' && botChoice === 'scissors') ||
    (playerChoice === 'scissors' && botChoice === 'paper') ||
    (playerChoice === 'paper' && botChoice === 'rock')
  ) {
    return `승리! 당신이 ${playerChoice}로 이겼습니다. 서버는 ${botChoice}를 선택했습니다.`;
  }
  return `패배! 당신이 ${playerChoice}를 선택했지만, 서버는 ${botChoice}로 이겼습니다.`;
}

// 단순 라우팅: /rock, /paper, /scissors 요청 처리
app.get(['rock', 'paper', 'scissors'].map(choice => `/${choice}`), (req, res) => {
  const playerChoice = req.path.slice(1); // '/rock' -> 'rock'
  const botChoice = getRandomChoice();
  const result = judge(playerChoice, botChoice);
  res.send(result);
});

// 기본 안내 메시지
app.get('/', (req, res) => {
  res.send('가위바위보 게임: /rock, /paper, /scissors 로 요청해보세요!');
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

