export const randomPicker = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const pickUniqueNumbers = (rangeStart: number, rangeEnd: number, count: number) => {
  const numbers: number[] = [];
  const rangeSize = rangeEnd - rangeStart + 1;

  if (count > rangeSize) {
    throw new Error("Count cannot exceed the range size.");
  }

  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * rangeSize) + rangeStart;

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
};
