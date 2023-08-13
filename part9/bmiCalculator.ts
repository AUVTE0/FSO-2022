const calculateBmi = (height: number, weight: number) => {
    try {
        const BMI = weight/(height/100)**2;  
        if (BMI < 16){
            return 'Underweight (Severe thinness)';
        }
        else if (BMI < 17){
            return 'Underweight (Moderate thinness)';
        }
        else if (BMI < 18.5){
            return 'Underweight (Mild thinness)';
        }
        else if (BMI < 25) {
            return 'Normal (Healthy weight)';
        }
        else if (BMI < 30) {
            return 'Overweight (Pre-obese)';
        }
        else if (BMI < 35) {
            return 'Obsese (Class I)';
        }
        else if (BMI < 40) {
            return 'Obese (Class II)';
        }
        else {
            return 'Obese (Class III)';
        }
        }    
    catch (error: unknown) {
        let errorMessage = 'An error occured: '
        if (error instanceof Error){
            errorMessage += error.message;
        }
        console.log(errorMessage)
    }
}

console.log(calculateBmi(180, 74))