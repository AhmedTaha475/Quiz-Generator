import { quiz } from './quiz.js';

export class setting {


    constructor() {
        this.category = document.getElementById("options");
        this.startBtn = document.getElementById("startBtn");
        this.diff = document.getElementsByName("difficulty");
        this.amount = document.getElementById("number");
        this.startBtn.addEventListener("click", () => {
            this.startQuiz();
        })
    }
    async fetchData() {
        let checkedDiff = [...this.diff].filter(el => el.checked);
        let url = `https://opentdb.com/api.php?amount=${this.amount.value}&category=${this.category.value}&difficulty=${checkedDiff[0].value}`

        let apiData = await fetch(url);
        let response = await apiData.json();
        let apiResults = response.results
        return apiResults;
    }

    async startQuiz() {
        if (this.amount.value <= 0) {

        }
        else {
            let question = await this.fetchData();

            $("#setting").fadeOut(500, () => {
                $("#quiz").fadeIn(500)
            })
            new quiz(this.amount.value, question);
        }
    }
}