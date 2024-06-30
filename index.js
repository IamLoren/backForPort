import { log } from "console";
import fs from "fs/promises";

const read = async () => {
  try {
    const text = await fs.readFile("./files/num.txt", "utf-8");

    const numbers = text.split("\n").map((num) => parseInt(num));

    let accumulator = 0;
    let sum = 0;
    let mediana;
    let max = numbers[0];
    let min = numbers[0];

    for (let i = 0; i < numbers.length; i++) {
      accumulator += numbers[i];
      console.log(accumulator)
      if (
        numbers.length % 2 === 0 &&
        (i === numbers.length / 2 - 1 || i === numbers.length / 2)
      ) {
        sum += numbers[i];
        console.log(sum);
      } else {
        let index = Math.floor(numbers.length / 2);
        mediana = numbers[index];
      }
      mediana = sum / 2;
      if (numbers[i] > max) {
        max = numbers[i];
      }
      if (numbers[i] < min) {
        min = numbers[i];
      }
    }
    let average = accumulator / numbers.length;
    console.log(
      "Медіана:",
      mediana,
      "average:",
      average,
      "max:",
      max,
      "min:",
      min
    );
  } catch (error) {
    console.error("Помилка:", error.message);
  }
};

read();
