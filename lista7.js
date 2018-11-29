function getRandomvalue() {
  return Math.floor(Math.random() * (50 * 100 - 1 * 100) + 1 * 100) / (1 * 100);
}

function minCoinChange(coins, value) {
  const cache = [];
  value = value * 100;

  function makeChange(value) {
    if (!value) return [];
    if (cache[value]) return cache[value];

    let min = [], newMin, newAmount;

    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = value - coin;

      if (newAmount >= 0) { newMin = makeChange(newAmount); }

      if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
        min = [coin].concat(newMin);
      }
    }
    return (cache[value] = min);
  }
  return makeChange(value);
}

function printChange(coins, value, change) {
  let message = "O troco para " + value + " é composto por:\n";
  const changeObj = { 1: 0, 5: 0, 10: 0, 20: 0, 25: 0, 50: 0, 80: 0, 100: 0 };

  change.forEach(coin => { changeObj[coin] += 1; });

  coins.forEach(coin => {
    if (changeObj[coin] && changeObj[coin] > 0) {
      if (changeObj[coin] === 1) { message += changeObj[coin] + " moeda de " + translateCoins[coin] + " \n"; }
      else { message += changeObj[coin] + " moedas de " + translateCoins[coin] + " \n"; }
    }
  });
  console.log(message);
}

const translateCoins = { 1: "R$0,01", 5: "R$0,05", 10: "R$0,10", 20: "R$0,20", 25: "R$0,25", 50: "R$0,50", 80: "R$0,80", 100: "R$1,00" };
const coinsOptimal = [1, 5, 10, 25, 50, 100];
const coinsSubOptimal = [1, 5, 10, 20, 25, 50, 80, 100];

let value = 2.40;
console.log("Troco usando moedas otimizadas: ");
printChange(coinsOptimal, value, minCoinChange(coinsOptimal, value));

console.log("Troco usando moedas não otimizadas: ");
printChange(coinsSubOptimal, value, minCoinChange(coinsSubOptimal, value));

console.log("\n\nTeste com valor aleatorio:")
value = getRandomvalue();
console.log("Troco usando moedas otimizadas:");
printChange(coinsOptimal, value, minCoinChange(coinsOptimal, value));

console.log("Troco usando moedas não otimizadas:");
printChange(coinsSubOptimal, value, minCoinChange(coinsSubOptimal, value));