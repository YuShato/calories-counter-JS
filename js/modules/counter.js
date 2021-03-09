import {
    formatInput
} from '../utils/format-input.js';
import Result from './result.js';

const UserActivity = {
    MIN: 1.2,
    LOW: 1.375,
    MEDIUM: 1.55,
    HIGH: 1.725,
    MAX: 1.9,
};

const CaloriesCoefficient = {
    AGE: 5,
    WEIGHT: 10,
    HEIGHT: 6.25,
};

const GenderCoefficient = {
    MALE: 5,
    FEMALE: -160
};

const GoalCoefficient = {
    MIN: 0.85,
    MAX: 1.15
};

export default class Calculator {
    constructor(element) {
        this.root = element;
        this.form = this.root.querySelector(`.counter__form`);
        this.elements = this.form.elements;
        this.parameters = this.elements.parameters.elements;
        this.submit = this.elements.submit;
        this.reset = this.elements.reset;
        this.gender = this.elements.gender;
        this.age = this.elements.age;
        this.weight = this.elements.weight;
        this.height = this.elements.height;
        this.activity = this.elements.activity;

        this.result = new Result(this.root);

        this.parametersItems = Array.from(this.parameters);

        this._onFormFill = this._onFormFill.bind(this);
        this._onFormReset = this._onFormReset.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
    }

    _onFormFill() {
        this.submit.disabled = !this.form.checkValidity();
        this.reset.disabled = !this.parametersItems.some((el) => el.value);

        this.age.value = formatInput(this.age);
        this.height.value = formatInput(this.height);
        this.weight.value = formatInput(this.weight);
    }

    _onFormReset() {
        this.reset.disabled = true;
        this.submit.disabled = true;
        this.result.hide();
    }

    _onFormSubmit(evt) {
        evt.preventDefault();

        const caloriesData = {
            norm: this.getCaloriesNorm(),
            min: this.getCaloriesMin(),
            max: this.getCaloriesMax()
        };

        this.result.show(caloriesData);
    }

    init() {
        this.form.addEventListener(`input`, this._onFormFill, true);
        this.form.addEventListener(`reset`, this._onFormReset);
        this.form.addEventListener(`submit`, this._onFormSubmit);
    }

    deinit() {
        this.form.removeEventListener(`input`, this._onFormFill, true);
        this.form.removeEventListener(`reset`, this._onFormReset);
        this.form.removeEventListener(`submit`, this._onFormSubmit);
    }

    getCaloriesNorm() {
        const age = CaloriesCoefficient.AGE * this.age.value;
        const weight = CaloriesCoefficient.WEIGHT * this.weight.value;
        const height = CaloriesCoefficient.HEIGHT * this.height.value;
        const gender = GenderCoefficient[this.gender.value.toUpperCase()];
        const activity = UserActivity[this.activity.value.toUpperCase()];

        return Math.round((weight + height - age + gender) * activity);
    }

    getCaloriesMin() {
        return Math.round(this.getCaloriesNorm() * GoalCoefficient.MIN);
    }

    getCaloriesMax() {
        return Math.round(this.getCaloriesNorm() * GoalCoefficient.MAX);
    }
}
