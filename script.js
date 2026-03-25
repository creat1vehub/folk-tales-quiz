
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

document.getElementById("startGame").onclick=()=>{
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("boardWrapper").classList.remove("hidden");
};

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
let a=qa[index][1];
let s=qa[index][2];

tile.onclick=()=>{

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

document.getElementById("showAnswer").onclick=()=>{
document.getElementById("answer").classList.remove("hidden");
};

document.getElementById("back").onclick=()=>{
document.getElementById("modal").classList.add("hidden");
};
