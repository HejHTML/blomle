const imageBox = document.getElementById("image");
const guessInput = document.getElementById("guess");
const checkBtn = document.getElementById("checkBtn");
const skipBtn = document.getElementById("skip-btn");
const result = document.getElementById("result");
const scoreEl = document.getElementById("score"); 
const imagesLeftEl = document.getElementById("imagesLeft"); 

// Lista med växter (namn och bild)
let fruitTrees = [
  { name: "Verbena", image: "https://cdn.pixabay.com/photo/2016/11/22/13/09/plant-1849267_1280.jpg" },
  { name: "Malva", image: "https://cdn.pixabay.com/photo/2019/10/03/12/15/musk-mallow-4523107_1280.jpg" },
  { name: "Lilja", image: "https://cdn.pixabay.com/photo/2016/04/04/13/19/lilies-1309299_1280.jpg" },
  { name: "Barbadin", image: "https://cdn.pixabay.com/photo/2018/06/10/10/43/passion-flower-3466146_1280.jpg" },
  { name: "Vallmo", image: "https://cdn.pixabay.com/photo/2022/06/25/15/54/opium-poppy-7283720_1280.jpg" },
  { name: "Tidlösa", image: "https://cdn.pixabay.com/photo/2020/08/30/13/33/autumn-crocus-5529608_1280.jpg" },
  { name: "Kärleksört", image: "https://cdn.pixabay.com/photo/2014/09/20/23/58/sedum-454487_1280.jpg" },
  { name: "Krokus", image: "https://cdn.pixabay.com/photo/2023/04/05/15/16/flower-7901721_1280.jpg" },
  { name: "Lavendel", image: "https://cdn.pixabay.com/photo/2020/01/14/16/26/lavender-4765498_1280.jpg" },
  { name: "Iris", image: "https://cdn.pixabay.com/photo/2022/06/07/17/43/sword-lilies-7248948_1280.jpg" },
  { name: "Tulpan", image: "https://cdn.pixabay.com/photo/2018/05/10/23/22/tulips-3389122_1280.jpg" },
  { name: "Kaprifol", image: "https://cdn.pixabay.com/photo/2018/06/21/21/08/honeysuckle-3489459_1280.jpg" },
  { name: "Klematis", image: "https://cdn.pixabay.com/photo/2018/07/05/19/37/clematis-3519040_1280.jpg" },
  { name: "Benved", image: "https://cdn.pixabay.com/photo/2022/01/04/06/23/euonymus-6914400_1280.jpg" },
  { name: "Blåsippa", image: "https://cdn.pixabay.com/photo/2018/04/18/08/59/flower-3329845_1280.jpg" },
  { name: "Snödroppe", image: "https://cdn.pixabay.com/photo/2016/01/28/16/18/spring-1166564_1280.jpg" },
];

let currentTree = null;
let guessesLeft = 3;
let score = parseInt(localStorage.getItem("score")) || 0;

// Hantera max 3 bilder per dag
let today = new Date().toLocaleDateString();
let dailyData = JSON.parse(localStorage.getItem("dailyData")) || { date: today, imagesLeft: 3 };
let usedTrees = [];

if (dailyData.date !== today) {
  dailyData = { date: today, imagesLeft: 3 };
  usedTrees = [];
}

function startConfettiRain() {
  const duration = 3000; // 3 sekunder regn
  const end = Date.now() + duration;

  (function frame() {
    // Skjut konfetti från vänster och höger
    confetti({
      particleCount: 5,
      spread: 60,
      startVelocity: 30,
      origin: { x: 0, y: Math.random() - 0.2 } 
    });
    confetti({
      particleCount: 5,
      spread: 60,
      startVelocity: 30,
      origin: { x: 1, y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Uppdatera UI med poäng och bilder kvar
function updateUI() {
  scoreEl.textContent = score;
  imagesLeftEl.textContent = dailyData.imagesLeft;
}

// Slumpa ett träd
function getRandomTree() {
  const index = Math.floor(Math.random() * fruitTrees.length);
  return fruitTrees[index];
}

// Visa trädets bild
function showTree(tree) {
  currentTree = tree;
  imageBox.style.backgroundImage = `url('${tree.image}')`;
  guessInput.value = "";
  result.textContent = "";
  guessesLeft = 3;
}

function preloadImages() {
  fruitTrees.forEach(tree => {
    const img = new Image();
    img.src = tree.image;
  });
}
preloadImages();

// Ny runda
function newRound() {
  if (dailyData.imagesLeft <= 0) {
    result.textContent = "Du har redan gissat på dagens 3 bilder!";
    return;
  }
// Filtrera bort redan använda träd
const availableTrees = fruitTrees.filter(tree => !usedTrees.includes(tree));

// Slumpa ett träd från tillgängliga
const tree = availableTrees[Math.floor(Math.random() * availableTrees.length)];
usedTrees.push(tree);

showTree(tree);
}

// Kontrollera gissning
checkBtn.addEventListener("click", () => {
    if (dailyData.imagesLeft <= 0) {
    result.textContent = "Du har inga gissningar kvar idag!";
    return;
    }
  const guess = guessInput.value.trim().toLowerCase();
  if (!currentTree || !guess) return;
 if (guess === currentTree.name.toLowerCase()) {
    score++;

    // Kontrollera om detta var den sista bilden
    const wasLastImage = (dailyData.imagesLeft === 1);

    dailyData.imagesLeft = Math.max(0, dailyData.imagesLeft - 1);

    // Starta konfetti om man klarade alla tre
    if (wasLastImage) {
        startConfettiRain();
        result.textContent = "GRYM! Du klarade alla dagens bilder! 🎉";
    }

    result.textContent = `Rätt! (${currentTree.name})`;
    localStorage.setItem("score", score);
    localStorage.setItem("dailyData", JSON.stringify(dailyData));
    updateUI();
    setTimeout(newRound, 1000);
  } else {
    guessesLeft--;
    if (guessesLeft > 0) {
      result.textContent = `Fel! Du har ${guessesLeft} försök kvar.`;
    } else {
      dailyData.imagesLeft = Math.max(0, dailyData.imagesLeft - 1);

      result.textContent = `Fel igen! Rätt svar: ${currentTree.name}`;
      localStorage.setItem("dailyData", JSON.stringify(dailyData));
      updateUI();
      setTimeout(newRound, 1500);
    }
  }
});

// Hoppa över-knappen
skipBtn.addEventListener("click", () => {
  if (dailyData.imagesLeft <= 0) {
    result.textContent = "Du har redan gissat på dagens 3 bilder!";
    return;
  }
dailyData.imagesLeft = Math.max(0, dailyData.imagesLeft - 1);

// Lägg till det nuvarande trädet i usedTrees så det inte dyker upp igen
if (currentTree) {
  usedTrees.push(currentTree);
}

localStorage.setItem("dailyData", JSON.stringify(dailyData));
updateUI();
result.textContent = "Du hoppade över!";
setTimeout(newRound, 500);

});

// Starta spelet
updateUI();
newRound();










