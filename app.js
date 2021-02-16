//  REQUIREMENTS
// calculate and print user's ideal weight
// calculate and print if user is under or over weight
// calculate and print daily caloric burn w / w out exercise and depending on sex
// calculate and print daily calories needed for steady weight loss / gain
// calculate and print how long weight change will take
// create validations and print error message if data is incorrectly entered

// BUSINESS LOGIC
// We need a bmi calculator + ideal weight calculator, bmr calculator, tdee calculator, and diet plan calculator

// DATA MODELING AND STORAGE
// We need the user's sex, activity level, weight in kg, and height in m /cm
// We need standard bmi, bmr, and tdee calculations as well as data on ideal weight and weight change calories
// The formula for BMI is weigh (kg) / (height (m) x height (m))
// A healthy range of BMI is 18.5 to 25
// We'll need the user's sex and exercise level in the form of string and the rest as numbers
// Based on the amount you exercise, use the following multiples:

// If you rarely exercise, multiply your BMR by 1.2
// If you exercise on 1 to 3 days per week, multiply your BMR by 1.375
// If you exercise on 3 to 5 days per week, multiply your BMR by 1.55
// If you exercise 6 to 7 days per week, multiply your BMR by 1.725
// If you exercise every day and have a physical job or if you often exercise twice a day, multiply your BMR by 1.9

// We'll store everything in the memory of local computer using variables because i don't know how to do it any other way :/

//calculate bmi
function calculateBMI(weightInKg, heightInM) {
        bmi = Math.round(weightInKg / (heightInM * heightInM));
        return bmi;
    }

//calculate bmr
function calculateBMR(height, age, sex) {
        let bmr;
        if (sex === `male`) {
            bmr = Math.round(10 * 6.25 * (height * 100) -5 * age) + 50;
        } else if ( sex === `female`) {
            bmr = Math.round(10 * 6.25 * (height * 100) -5 * age) - 100;
        } else {
            bmr = Math.round(10 * 6.25 * (height * 100) -5 * age);
        }
        return bmr;
    }

//calculate tdee
function calculateTdee(bmr, exercise) {
    let tdee;
    if (exercise === `none`) {
        tdee = Math.round(bmr);
    } else if (exercise === `occasional`) {
        tdee = Math.round(bmr * 1.4);
    } else if (exercise === `often`) {
        tdee = Math.round(bmr * 1.6);
    } else if (exercise === `everyday`) {
        tdee = Math.round(bmr * 1.7);
    }
    return tdee;   
}

//calculate ideal weight
function calculateIdealWeight(height) {
    let idealWeight = Math.round(22.5 * height * height);
    return idealWeight;
}

//calculate how many weeks of dieting until user reaches ideal weight
function weeksToGoal(idealWeight, weight) {
    let weeksToIdealWeight = (idealWeight - weight) / .5;
    return weeksToIdealWeight;
} 

function weightToChange(weight, idealWeight) {
    let kgToIdealWeight = idealWeight - weight;
    if (kgToIdealWeight < 0) {
        return `you have ${Math.abs(kgToIdealWeight)} kg to lose.`;
    } else {
        return `you have ${Math.abs(kgToIdealWeight)} kg to gain`;
    }   
}

//calculate diet calories determine if user needs to lose or gain
function dietCalories(weight, idealWeight, tdee) {
    let dietAdvice = {};
    if (weight > idealWeight) {
        dietAdvice.recommendedCalories = tdee - 500;
        dietAdvice.gainLose = `lose`; 
    } else if (weight < idealWeight) {
        dietAdvice.recommendedCalories = tdee + 500;
        dietAdvice.gainLose = `gain`;
    } else {
        recommendedCalories = `keep doin' what yr doin'`;
    }
    return dietAdvice;
}


let inputs = [48.5, 1.51, 35, `female`, `often`];
    

function bmiCalculator(inputs) {

    //initialize user object
    let user = new Object;
    
    // add inputs to user object
    user.weight = inputs[0];
    user.height = inputs[1];
    user.age = inputs[2];
    user.sex = inputs[3];
    user.exercise = inputs[4];

    //validate inputs and add to html
    if (user.weight === ` `) {
        document.getElementById(`weight`).innerHTML = `please enter your weight in kgs`;
    } else if (typeof user.weight !== `number`) {
        document.getElementById(`weight`).innerHTML = `please enter your weight in a numerical format`;
    } else {
        document.getElementById(`weight`).innerHTML = `weight : ${user.weight} kg`;
    }
    if (user.height === ` `) {
        document.getElementById(`height`).innerHTML = `please enter your height in meters`;
    } else if (typeof user.height !== `number`) {
        document.getElementById(`height`).innerHTML = `please enter your height in a numerical format`;
    } else {
        document.getElementById(`height`).innerHTML = `height : ${user.height} m`;
    }

    if (user.age === ` `) {
        document.getElementById(`age`).innerHTML = `please enter your age`;
    } else if (typeof user.age !== `number`) {
        document.getElementById(`age`).innerHTML = `please enter your age in a numerical format`;
    } else {
        document.getElementById(`age`).innerHTML = `age : ${user.age} yrs`;
    }

    if (user.sex === ` `) {
        document.getElementById(`sex`).innerHTML = `please enter your sex : female, male, or enby`;
    } else if (user.sex !== `female` && user.sex !== `male` && user.sex !== `enby`) {
        document.getElementById(`sex`).innerHTML = `please enter your sex as : female, male, or enby`;
    } else {
        document.getElementById(`sex`).innerHTML = `sex : ${user.sex}`;
    }

    if (user.exercise === ` `) {
        document.getElementById(`sex`).innerHTML = `please enter your level of exercise : none, occasional, often, or everyday`;
    } else if (user.exercise !== `none` && user.exercise !== `occasional` && user.exercise !== `often` && user.exercise !== `everyday`) {
        document.getElementById(`exercise`).innerHTML = `please enter your level of exercise as none, occasional, often, or everyday`;
    } else {
        document.getElementById(`exercise`).innerHTML = `exercise level : ${user.exercise}`;
    }

    //get user bmi / call bmi function and add to html
    user.bmi = calculateBMI(user.weight, user.height);
    document.getElementById(`bmi`).innerHTML = `your bmi is : ${user.bmi}`;

    //get user bmr / call bmr function and add to html
    user.bmr = calculateBMR(user.height, user.age, user.sex);
    document.getElementById(`bmr`).innerHTML = `your bmr is : ${user.bmr} calories per day`;
    
    //get user tdee/ call tdee function and add to html
    user.tdee = calculateTdee(user.bmr, user.exercise);
    document.getElementById(`tdee`).innerHTML = `your tdee is : ${user.tdee} calories per day`;
    
    // get ideal user ideal weight / call function and add to html
    user.idealWeight = calculateIdealWeight(user.height);
    document.getElementById(`ideal-weight`).innerHTML = `your ideal weight is ${user.idealWeight} kg`;

     // get weight user needs to lose or gain to reach ideal weight
    user.kgToIdealWeight = weightToChange(user.weight, user.idealWeight);
    document.getElementById(`weight-change`).innerHTML = user.kgToIdealWeight;

    // get weeks until user reaches goal weight call ideal weight function and add to html
    user.weeksToIdealWeight = weeksToGoal(user.idealWeight, user.weight);
    document.getElementById(`lengthOfDiet`).innerHTML = `you'll need to diet for ${user.weeksToIdealWeight} weeks to reach your ideal weight`

    //get recommended calories and gain or lose call diet calories function and add to html
    user.dietAdvice = dietCalories(user.weight, user.idealWeight, user.tdee);
    user.recommendedCalories = user.dietAdvice.recommendedCalories;
    user.gainLose = user.dietAdvice.gainLose;
    document.getElementById(`recommendedCalories`).innerHTML = `to ${user.gainLose} half a kilo per week, you'll need to eat : ${user.recommendedCalories} calories per day`;
   

    return user;
}

let user = bmiCalculator(inputs);



// user.bmi = bmiCalculator(user);
// document.getElementById(`bmi`).innerHTML = `your bmi is : ${user.bmi}`;


// let user = {
//     weightInKg : 48,
//     heightInM : 1.51,
//     age : 35,
//     sex : `female`,
//     exercise : `often`
// }

// user.idealWeight = Math.round(22.5 * user.heightInM * user.heightInM);
// user.weeksToIdealWeight = (user.idealWeight - user.weightInKg) / .5;

// function calculateBMI(weightInKg, heightInM) {
//     bmi = Math.round(weightInKg / (heightInM * heightInM));
//     return bmi;
// }

// user.bmi = calculateBMI(user.weightInKg, user.heightInM)

// function bmrCalculator(height, age, sex) {
//     let bmr;
//     if (sex === `male`) {
//         bmr = Math.round(10 * 6.25 * (height * 100) -5 * age) + 50;
//     } else if ( sex === `female`) {
//         bmr = Math.round(10 * 6.25 * (height * 100) -5 * age) - 100;
//     } else {
//         bmr = Math.round(10 * 6.25 * (height * 100) -5 * age);
//     }
//     return bmr;
// }

// user.bmr = bmrCalculator(user.heightInM, user.age, user.sex)

// function calculateTdee(bmr, exercise) {
//     let tdee;
//     if (user.exercise === `none`) {
//         tdee = Math.round(bmr);
//     } else if (exercise === `occasional`) {
//         tdee = Math.round(bmr * 1.4);
//     } else if (exercise === `often`) {
//         tdee = Math.round(bmr * 1.6);
//     } else if (exercise === `everyday`) {
//         tdee = Math.round(bmr * 1.7);
//     }
//     return tdee;   
// }

// user.tdee = calculateTdee(user.bmr, user.exercise);

// function dietCalories(weight, idealWeight, tdee) {
//     let dietAdvice = [];
//     if (weight > idealWeight) {
//         dietAdvice[0] = tdee - 500;
//         dietAdvice[1] = `lose`; 
//     } else if (weight < idealWeight) {
//         dietAdvice[0] = tdee + 500;
//         dietAdvice[1] = `gain`;
//     } else {
//         recommendedCalories = `keep doin't what yr doin'`;
//     }
//     return dietAdvice;
// }

// function dietCalories(weight, idealWeight, tdee) {
//     let dietAdvice = {};
//     if (weight > idealWeight) {
//         dietAdvice.recommendedCalories = tdee - 500;
//         dietAdvice.gainLose = `lose`; 
//     } else if (weight < idealWeight) {
//         dietAdvice.recommendedCalories = tdee + 500;
//         dietAdvice.gainLose = `gain`;
//     } else {
//         recommendedCalories = `keep doin' what yr doin'`;
//     }
//     return dietAdvice;
// }

// user.dietAdvice = dietCalories(user.weightInKg, user.idealWeight, user.tdee);

// user.recommendedCalories = user.dietAdvice.recommendedCalories;
// user.gainLose = user.dietAdvice.gainLose;

// function weightToShift(weight, idealWeight) {
//     let kgToIdealWeight = idealWeight - weight;
//     if (kgToIdealWeight < 0) {
//         return `you have ${Math.abs(kgToIdealWeight)} kg to lose.`;
//     } else {
//         return `you have ${Math.abs(kgToIdealWeight)} kg to gain.`;
//     }   
// }

// user.kgToIdealWeight = weightToShift(user.weightInKg, user.idealWeight);
















// let weightInKg = 48.5;
// let heightInM = 1.51;
// let age = 35;
// let sex = `female`;
// let exercise = `often`; 
// let bmi = Math.round(weightInKg / (heightInM * heightInM));
// let idealWeight = Math.round(22.5 * heightInM * heightInM);
// let bmr = Math.round(10 * 6.25 * (heightInM * 100) -5 * age);
// let weeksToIdealWeight = (idealWeight - weightInKg) / .5;



// function calculateTdee(bmr, exercise) {
//     let tdee;
//     if (exercise === `none`) {
//         tdee = Math.round(bmr);
//     } else if (exercise === `occasional`) {
//         tdee = Math.round(bmr * 1.4);
//     } else if (exercise === `often`) {
//         tdee = Math.round(bmr * 1.6);
//     } else if (exercise === `everyday`) {
//         tdee = Math.round(bmr * 1.7);
//     }
//     return tdee;   
// }

// let tdee = calculateTdee(bmr, exercise);

// function dietCalories(weight, idealWeight, tdee) {
//     let dietAdvice = [];
//     if (weight > idealWeight) {
//         dietAdvice[0] = tdee - 500;
//         dietAdvice[1] = `lose`; 
//     } else if (weight < idealWeight) {
//         dietAdvice[0] = tdee + 500;
//         dietAdvice[1] = `gain`;
//     } else {
//         recommendedCalories = `keep doin't what yr doin'`;
//     }
//     return dietAdvice;
// }

// function dietCalories(weight, idealWeight, tdee) {
//     let dietAdvice = {};
//     if (weight > idealWeight) {
//         dietAdvice.recommendedCalories = tdee - 500;
//         dietAdvice.gainLose = `lose`; 
//     } else if (weight < idealWeight) {
//         dietAdvice.recommendedCalories = tdee + 500;
//         dietAdvice.gainLose = `gain`;
//     } else {
//         recommendedCalories = `keep doin't what yr doin'`;
//     }
//     return dietAdvice;
// }

// let dietAdvice = dietCalories(weightInKg, idealWeight, tdee);

// let recommendedCalories = dietAdvice.recommendedCalories;
// let gainLose = dietAdvice.gainLose;

// function weightToShift(weight, idealWeight) {
//     let kgToIdealWeight = idealWeight - weight;
//     if (kgToIdealWeight < 0) {
//         return `you have ${Math.abs(kgToIdealWeight)} kg to lose.`;
//     } else {
//         return `you have ${Math.abs(kgToIdealWeight)} kg to gain.`;
//     }   
// }

// let kgToIdealWeight2 = weightToShift(weightInKg,idealWeight);

// document.getElementById(`weight`).innerHTML = `weight : ${weightInKg} kg`;
// document.getElementById(`height`).innerHTML = `height : ${heightInM} m`;
// document.getElementById(`age`).innerHTML = `age : ${age} yrs`;
// document.getElementById(`sex`).innerHTML = `sex : ${sex}`;
// document.getElementById(`exercise`).innerHTML = `exercise level : ${exercise}`;
// document.getElementById(`bmi`).innerHTML = `your bmi is : ${bmi}`;
// document.getElementById(`ideal-weight`).innerHTML = `your ideal weight is ${idealWeight} kg`;
// document.getElementById(`weight-change`).innerHTML = kgToIdealWeight2;
// document.getElementById(`bmr`).innerHTML = `your bmr is : ${bmr} calories per day`;
// document.getElementById(`recommendedCalories`).innerHTML = `to ${gainLose} half a kilo per week, you'll need to eat : ${recommendedCalories} calories per day`;
// document.getElementById(`lengthOfDiet`).innerHTML = `you'll need to diet for ${weeksToIdealWeight} weeks to reach your ideal weight`





