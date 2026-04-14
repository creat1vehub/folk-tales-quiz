
let teams=[];
let scoresBoard=[];
let currentTeam=0;
let currentValue=0;

let finishedTeams=[];

function showWinner(teamName){
const screen=document.createElement("div");
screen.style.position="fixed";
screen.style.top="0";
screen.style.left="0";
screen.style.width="100%";
screen.style.height="100%";
screen.style.background="rgba(0,0,0,0.8)";
screen.style.display="flex";
screen.style.flexDirection="column";
screen.style.alignItems="center";
screen.style.justifyContent="center";
screen.style.color="white";
screen.style.fontSize="40px";
screen.style.zIndex="9999";

screen.innerHTML=`🏆<br>Победитель раунда<br><b>${teamName}</b><br><button style="font-size:24px;margin-top:20px">Продолжить игру</button>`;

screen.querySelector("button").onclick=()=>{
screen.remove();
};

document.body.appendChild(screen);
}


function renderScores(){
const box=document.getElementById("scores");
box.innerHTML="";
teams.forEach((t,i)=>{
let div=document.createElement("div");
div.innerText=t+": "+scoresBoard[i];
if(i===currentTeam){div.style.background="#ffe9a8";div.style.fontWeight='bold';}
box.appendChild(div);
});
}

document.getElementById("startGame").onclick=()=>{
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("teamSetup").classList.remove("hidden");

let countInput=document.getElementById("teamCount");
let teamInputs=document.getElementById("teamInputs");

function buildInputs(){
teamInputs.innerHTML="";
for(let i=0;i<countInput.value;i++){
let inp=document.createElement("input");
inp.placeholder="Команда "+(i+1);
teamInputs.appendChild(inp);
teamInputs.appendChild(document.createElement("br"));
}
}
buildInputs();
countInput.onchange=buildInputs;

document.getElementById("startQuiz").onclick=()=>{
teams=[...teamInputs.querySelectorAll("input")].map(i=>i.value||"Команда");
scoresBoard=teams.map(()=>0);
renderScores();

document.getElementById("teamSetup").classList.add("hidden");
document.getElementById("boardWrapper").classList.remove("hidden");
document.getElementById("scoreBoard").classList.remove("hidden");
};
};




const categories=[
"Превращения и облик",
"Хитрость и смекалка",
"Животные",
"Испытания и подвиги",
"Сила и соревнование",
"Путешествия и дорога",
"Главные герои"
];


const scores=[10,20,30];

const qa=[
["Как женщина поняла, что превращается в лисицу?","У неё появились лисьи уши и хвост."],
["Каким образом женщина превращалась в белую медведицу?","Она надевала медвежью шкуру."],
["Что произошло с женой Сохолылана после её заклинаний в тундре?","Она рассыпалась на части, которые забрали разные созвездия."],
["Где сиротка спрятался во время игры в прятки с богом?","Под ногой бога, держась за волосы на его ноге."],
["Как Анчы-Кара узнал способ вылечить ханскую дочь?","Он услышал разговор лебедей."],
["Какую клятву Куйжий потребовал от иныжа?","Вывести похищенных женщин и вернуть их тем, кому они принадлежат."],
["Что ворон подарил человеку?","Деревянное блюдо."],
["Как Анчы-Кара начал понимать язык животных?","Он поднялся на гору, нашёл три бусины и проглотил их."],
["Кто помог Батырy выбраться из подземного мира?","Орлица."],
["Какой подвиг совершил Батыр в пещере?","Он убил людоеда и спас девушек."],
["Какое испытание устроил медведь Батырy, чтобы проверить его силу?","Он велел ему вырвать дерево с корнем."],
["Каким было последнее испытание Анчы-Кары?","Убийство чудовища шулбуса."],
["Какое состязание предложил бычок лосю?","Соревнование в беге вокруг озера."],
["Почему лось проиграл соревнование бычку?","Рыбы отвечали за бычка и обманывали лося."],
["Как человек победил белого медведя?","Он стрелял стрелами в плечи медведю."],
["Куда отправился Сохолылан, чтобы вернуть свою жену?","На небо."],
["Куда попал Батыр после того, как сел на чёрного барана?","В подземный мир."],
["На чём Анчы-Кара отправился на небо искать свою жену?","На байдаре из моржового клыка с крючком."],
["Как зовут героя, которого родители оставили на поляне в лесу?","Батыр."],
["Какой недуг был у дочери хана Дарынзы?","Она постепенно слепла."],
["Кто помогал Куйжию на протяжении его путешествия?","Хагрей."],
];



const board=document.getElementById("board");
let index=0;

categories.forEach(cat=>{

let catDiv=document.createElement("div");
catDiv.className="category";
catDiv.innerText=cat;
board.appendChild(catDiv);

scores.forEach(score=>{

let tile=document.createElement("div");
tile.className="tile v"+score;
tile.innerText=score;

let q=qa[index][0];
let value=score;
let a=qa[index][1];
let s=qa[index][2];

tile.onclick=()=>{
currentValue=value;

if(tile.classList.contains("used")) return;

tile.classList.add("used");

document.getElementById("modal").classList.remove("hidden");
document.getElementById("question").innerText=q;

document.getElementById("answer").innerText="Ответ: "+a;
document.getElementById("answer").classList.add("hidden");

};

board.appendChild(tile);
index++;

});
});


document.getElementById("judgeButtons").style.display="none";
document.getElementById("showAnswer").onclick=()=>{


document.getElementById("answer").classList.remove("hidden");
document.getElementById("judgeButtons").style.display="block";

};

document.getElementById("back").onclick=()=>{
document.getElementById("modal").classList.add("hidden");
};


document.getElementById("correct").onclick=()=>{
scoresBoard[currentTeam]+=currentValue;
if(scoresBoard[currentTeam] >= 100 && !finishedTeams.includes(currentTeam)){
finishedTeams.push(currentTeam);
showWinner(teams[currentTeam]);
}


do {
currentTeam=(currentTeam+1)%teams.length;
} while(finishedTeams.includes(currentTeam) && finishedTeams.length < teams.length);

renderScores();
document.getElementById("modal").classList.add("hidden");
};

document.getElementById("wrong").onclick=()=>{

do {
currentTeam=(currentTeam+1)%teams.length;
} while(finishedTeams.includes(currentTeam) && finishedTeams.length < teams.length);

renderScores();
document.getElementById("modal").classList.add("hidden");
};
