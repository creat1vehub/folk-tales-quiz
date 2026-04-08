
let teams=[];
let scoresBoard=[];
let currentTeam=0;
let currentValue=0;

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
"Превращение и облик",
"Состязание и испытание",
"Благодарность",
"Животные",
"Герои",
"Дом и жилище",
"Способ передвижения"
];

const scores=[10,20,30];

const qa=[
["Во что превратилась женщина?","В лисицу","Алеутская сказка"],
["Во что превратилась женщина у льда?","В белую медведицу","Чукотская сказка"],
["Куда исчезла жена Сохолылана?","К звёздам","Якутская сказка"],

["Во что играли бог и сиротка?","В прятки","Бурятская легенда"],
["В чём состязались лось и бычок?","В беге вокруг озера","Сибирская сказка"],
["Какое испытание должны были пройти женихи?","Спрятаться так, чтобы их не нашли","Адыгская сказка"],

["Как медведица отблагодарила мальчика?","Научила его охотиться","Северная сказка"],
["Чем ворон отблагодарил человека?","Волшебным блюдом","Ненецкая сказка"],
["Кто помог Шамилю спрятаться?","Животные","Кавказская сказка"],

["Кто помог узнать правду?","Маленькая серая птичка","Якутская сказка"],
["Кто воспитал богатыря Батыра?","Медведь","Алтайская сказка"],
["Какие животные помогали Шамилю?","Орёл, коза, рыба и лиса","Кавказская сказка"],

["Кто главный герой «Кутха»?","Кутха","Ительменская сказка"],
["Кто был мужем героини?","Одноглазый человек","Чукотская сказка"],
["Кто герой «Анчы-Кара»?","Анчы-Кара","Тувинская сказка"],

["В каком жилище жила семья?","В яранге","Чукотская сказка"],
["Где оказалась женщина?","В подземной юрте","Казахская сказка"],
["Как называется жилище кочевых народов?","Юрта","Степные народы"],

["Как великан доставил женщину?","Нёс на плечах","Северная сказка"],
["Как герой перешёл море?","По льду","Северная сказка"],
["На чём ехал Кутха?","На нарте","Ительменская сказка"]
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
document.getElementById("source").innerText="("+s+")";
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
if(scoresBoard[currentTeam]>=100){

document.body.innerHTML=`
<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial;background:#f4f2ed;">
<div style="text-align:center;font-size:60px;">
🏆 Победила команда:<br><b>${teams[currentTeam]}</b>
</div>
</div>
`;

location.reload();
}
currentTeam=(currentTeam+1)%teams.length;
renderScores();
document.getElementById("modal").classList.add("hidden");
};

document.getElementById("wrong").onclick=()=>{
currentTeam=(currentTeam+1)%teams.length;
renderScores();
document.getElementById("modal").classList.add("hidden");
};
