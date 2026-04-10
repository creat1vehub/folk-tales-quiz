
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
"Герою помогли животные",
"Герои",
"Дом и жилище",
"Способ передвижения"
];

const scores=[10,20,30];

const qa=[
["В алеутской сказке «Женщина-лисица» какое необычное свойство скрывала женщина от людей?","Она превращалась в лисицу","Алеутская сказка"],
["В чукотской сказке «Женщина и белая медведица» что происходит с женщиной, когда она оказывается у моря среди льдов?","Она превращалась в белую медведицу","Чукотская сказка"],
["В якутской сказке «Сохолылан» куда исчезает жена героя после того, как её тайна раскрывается?","Она поднималась к звёздам","Якутская сказка"],

["В бурятской легенде «Бог и сиротка» какую игру предложил бог сиротке?","Они играли в прятки","Бурятская легенда"],
["В сибирской сказке «Лось и бычок» какое соревнование устроили между собой животные?","Они состязались в беге вокруг озера","Сибирская сказка"],
["В адыгской сказке «Испытание женихов» что должны были сделать женихи, чтобы доказать свою ловкость?","Они должны были спрятаться так, чтобы их не нашли","Адыгская сказка"],

["В северной сказке «Медведица и мальчик» чему медведица научила мальчика в знак благодарности?","Она научила мальчика охотиться","Северная сказка"],
["В ненецкой сказке «Ворон и человек» какой подарок ворон дал человеку?","Он подарил человеку волшебное блюдо","Ненецкая сказка"],
["В кавказской сказке «Шамиль» кто помог герою спрятаться от врагов?","Герою помогли животные","Кавказская сказка"],

["В якутской сказке «Серая птичка» кто рассказал людям правду о случившемся?","Правду рассказала маленькая серая птичка","Якутская сказка"],
["В алтайской сказке «Богатырь Батыр» какое животное вырастило будущего героя?","Его вырастил медведь","Алтайская сказка"],
["В кавказской сказке «Шамиль» какие животные помогали герою?","Ему помогали орёл, коза, рыба и лиса","Кавказская сказка"],

["Как зовут главного героя ительменской сказки «Кутха»?","Главного героя зовут Кутха","Ительменская сказка"],
["В чукотской сказке «Одноглазый человек» какая необычная особенность была у мужа героини?","Её мужем был одноглазый человек","Чукотская сказка"],
["Как зовут героя тувинской сказки «Анчы-Кара»?","Героя зовут Анчы-Кара","Тувинская сказка"],

["В чукотской сказке «Семья в тундре» как называется традиционное жилище, в котором жила семья?","Семья жила в яранге","Чукотская сказка"],
["В казахской сказке «Подземная юрта» где оказалась женщина после необычного происшествия?","Она оказалась в подземной юрте","Казахская сказка"],
["Как называется традиционное круглое жилище кочевых народов степей?","Это жилище называется юрта","Степные народы"],

["В северной сказке «Великан и женщина» как великан переносил женщину?","Он нёс её на плечах","Северная сказка"],
["В северной сказке «Переход через море» по чему герой смог перейти море?","Он перешёл море по льду","Северная сказка"],
["На каком транспорте передвигался герой ительменской сказки «Кутха»?","Он передвигался на нарте","Ительменская сказка"]
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
