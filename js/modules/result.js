import {
    formatNumber
} from '../utils/format-number.js';

export default class Result {
    constructor(element) {
        this.calculator = element;

        this.main = element.querySelector(`.counter__result`);

        this.rezultCaloriesMin = this.main.querySelector(`#calories-minimal`);
        this.resultCaloriesNorm = this.main.querySelector(`#calories-norm`);
        this.resultCaloriesMax = this.main.querySelector(`#calories-maximal`);
    }

    show(calories) {
        this.rezultCaloriesMin.textContent = formatNumber(calories.min);
        this.resultCaloriesNorm.textContent = formatNumber(calories.norm);
        this.resultCaloriesMax.textContent = formatNumber(calories.max);

        this.main.classList.remove(`counter__result--hidden`);
        this.main.scrollIntoView({
            block: `center`,
            behavior: `smooth`
        });
    }

    hide() {
        this.resultCaloriesNorm.textContent = 0;
        this.rezultCaloriesMin.textContent = 0;
        this.resultCaloriesMax.textContent = 0;

        this.main.classList.add(`counter__result--hidden`);
        this.calculator.scrollIntoView({
            block: `start`,
            behavior: `smooth`
        });
    }
}
