const words = "1,2,3,4".split(",");
let sum = 0;
words.forEach(w => sum += parseInt(w));

console.log(`sum: ${sum}`);