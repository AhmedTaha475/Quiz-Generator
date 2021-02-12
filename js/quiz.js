
export class quiz {

    constructor(noOfquestions, questions) {
        this.noOfquestions = noOfquestions;
        this.questions = questions;
        this.questIndicator = 0;
        this.correctAnswers = 0
        this.answersInput = document.getElementsByName("solutions");
        $("#total-amount").html(this.noOfquestions);
        this.nextBtn = document.getElementById("nextBtn");
        this.tryAnother = document.getElementById("tryAgain");
        /* this.currentQuestion = this.questions[this.questIndicator]; */
        this.showQuestion();
        this.nextBtn.addEventListener("click", () => {
            this.nextQuestion();
        })
        this.tryAnother.addEventListener("click", () => {
            this.tryAgain();
        })


    }
    showQuestion() {
        $("#question").html(this.questions[this.questIndicator].question);
        $("#quest-no").html(this.questIndicator + 1);
        let answers = this.getAnswers(this.questions[this.questIndicator]);
        this.showAnswers(answers);



    }
    getAnswers(currentQuestion1) {
        let answerArray = [
            currentQuestion1.correct_answer,
            ...currentQuestion1.incorrect_answers
        ]
        let ranNums = [],
            i = answerArray.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(answerArray[j]);
            answerArray.splice(j, 1);
        }

        return ranNums;
    }

    showAnswers(array) {
        let div = ``;
        for (var i = 0; i < array.length; i++) {
            div +=
                `
            <label class="form-check-label d-block">
                            <input type="radio" class="form-check-input" name="solutions" id="q${i}" value="${array[i]}">
                            ${array[i]}
            </label>
            `
        }
        $("#answer").html(div);
    }
    nextQuestion() {
        let checkedAnswer = [...this.answersInput].filter(el => el.checked);
        if (checkedAnswer.length == 0) {
            $("#quiz-alert").fadeIn(500);
        }
        else {
            $("#quiz-alert").fadeOut(500);
            this.checkAnswer(checkedAnswer) ? $("#correct").fadeIn(500, () => { this.show() }) : $("#incorrect").fadeIn(500, () => { this.show() });

        }

    }
    show() {
        $("#correct").fadeOut(500);
        $("#incorrect").fadeOut(500);
        this.questIndicator++;
        if (this.questIndicator < this.noOfquestions) {
            this.showQuestion();
        }
        else {
            this.finish();
        }


    }
    checkAnswer(answer) {
        if (answer[0].value == this.questions[this.questIndicator].correct_answer) {
            this.correctAnswers++;
            return true;

        }
        else {
            return false;
        }
    }
    finish() {

        $("#quiz").fadeOut(500, () => {
            $("#finish").fadeIn(500);
        });

        $("#result").html(this.correctAnswers);

    }
    tryAgain() {
        window.location.reload();
    }
}