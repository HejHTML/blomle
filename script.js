const imageBox = document.getElementById("image");
const guessInput = document.getElementById("guess");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");


// Lista med växter (namn och bild)
let fruitTrees = [
{ name: "Verbena", image: "https://cdn.pixabay.com/photo/2016/11/22/13/09/plant-1849267_1280.jpg" },
{name: "Malva", image: "https://cdn.pixabay.com/photo/2019/10/03/12/15/musk-mallow-4523107_1280.jpg"},
{name: "Lilja", image: "https://cdn.pixabay.com/photo/2025/07/01/05/17/05-17-30-689_1280.jpg"},
{name: "Barbadin", image: "https://cdn.pixabay.com/photo/2018/06/10/10/43/passion-flower-3466146_1280.jpg"},
{name: "Vallmo", image: "https://cdn.pixabay.com/photo/2022/06/25/15/54/opium-poppy-7283720_1280.jpg"},
{name: "Tidlösa", image: "https://cdn.pixabay.com/photo/2020/08/30/13/33/autumn-crocus-5529608_1280.jpg"},
{name: "Kärleksört", image: "https://cdn.pixabay.com/photo/2014/09/20/23/58/sedum-454487_1280.jpg"},
{name: "Krokus", image: "https://cdn.pixabay.com/photo/2023/04/05/15/16/flower-7901721_1280.jpg"},
{name: "Lavendel", image: "https://cdn.pixabay.com/photo/2020/01/14/16/26/lavender-4765498_1280.jpg"},
{name: "Iris", image: "https://cdn.pixabay.com/photo/2022/06/07/17/43/sword-lilies-7248948_1280.jpg"},
{name: "tulpan", image: "https://cdn.pixabay.com/photo/2018/05/10/23/22/tulips-3389122_1280.jpg"},
{name: "Kaprifol", image: "https://cdn.pixabay.com/photo/2018/06/21/21/08/honeysuckle-3489459_1280.jpg"},
{name: "Klematis", image: "https://cdn.pixabay.com/photo/2018/07/05/19/37/clematis-3519040_1280.jpg"},
{name: "Benved", image: "https://cdn.pixabay.com/photo/2022/01/04/06/23/euonymus-6914400_1280.jpg"},
{name: "Blåsippa", image: "https://cdn.pixabay.com/photo/2018/04/18/08/59/flower-3329845_1280.jpg"},
{name: "Snödroppe", image: "https://cdn.pixabay.com/photo/2016/01/28/16/18/spring-1166564_1280.jpg"},

];

let currentTree = null;
let guessesLeft = 3;

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

// Ny runda
function newRound() {
  const tree = getRandomTree();
  showTree(tree);
}

// Kontrollera gissning
checkBtn.addEventListener("click", () => {
  const guess = guessInput.value.trim().toLowerCase();
  if (!currentTree || !guess) return;

  if (guess === currentTree.name.toLowerCase()) {
    result.textContent = `Rätt! (${currentTree.name})`;
    setTimeout(newRound, 1500);
  } else {
    guessesLeft--;
    if (guessesLeft > 0) {
      result.textContent = `Fel! Du har ${guessesLeft} försök kvar.`;
    } else {
      result.textContent = `Fel igen! Rätt svar: ${currentTree.name}`;
      setTimeout(newRound, 2000);
    }
  }
});

// Starta spelet direkt
newRound();



