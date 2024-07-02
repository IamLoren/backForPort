import { log } from "console";
import fs from "fs/promises";

export const read = async () => {
  let accumulator = 0;
  let sum = 0;
  let mediana;
  let message =
    "З усіх значень у Вашому файлі отримано числа та розраховано запитувані параметри";

  let resp = {};

  try {
    const text = await fs.readFile("./uploads/uploaded_file.txt", "utf-8");
    if (!text.trim()) {
      throw new Error("У завантаженому файлі чисел не знайдено");
    }

    const numbers = text.split(/[,\s\n]+/).map((num) => parseInt(num));
    const filteredNumbers = numbers.filter((num) => {
      if (isNaN(num)) {
        message =
          "У Вашому списку виявлено нечислові символи. Вони були виключені з розрахунку запитуваних параметрів";
      }
      return !isNaN(num);
    });

    let max = filteredNumbers[0];
    let min = filteredNumbers[0];
    let length = filteredNumbers.length;

    for (let i = 0; i < length; i++) {
      accumulator += filteredNumbers[i];

      if (length % 2 === 0 && (i === length / 2 - 1 || i === length / 2)) {
        sum += filteredNumbers[i];
        console.log(sum);
        mediana = sum / 2;
      } else if (length % 2 !== 0) {
        let index = Math.floor((filteredNumbers.length - 1) / 2);
        mediana = filteredNumbers[index];
      }

      if (filteredNumbers[i] > max) {
        max = filteredNumbers[i];
      }
      if (filteredNumbers[i] < min) {
        min = filteredNumbers[i];
      }
    }

    let average = accumulator / filteredNumbers.length;

    resp = {
      message,
      mediana,
      average,
      max,
      min,
    };
  } catch (error) {
    console.error("Помилка:", error.message);
  }

  return resp;
};

read();
