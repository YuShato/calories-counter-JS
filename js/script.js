import Calculator from './modules/counter.js';

const calculatorElements = document.querySelectorAll(`.counter`);

calculatorElements.forEach((element) => {
  const calculator = new Calculator(element);
  calculator.init();
});
