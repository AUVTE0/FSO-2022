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

const parseArgsBmi = (args: string[]): [number, number] => {
    if (args.length !== 2){
        throw new Error('Exactly 2 arguments required')
    }
    
    let result:number[] = [];
    args.forEach(arg => {
        try {
            result.push(Number(arg))
        }
        catch (error: unknown){
            throw new Error(`Error: ${arg} is not a number`)
        }
    })
    return [result[0], result[1]];
}

// console.log(calculateBmi(180, 74))

try {
    const args = process.argv;
    const inputs = parseArgsBmi(args.slice(2, args.length));
    console.log(calculateBmi(...inputs));
}
catch (error: unknown){
    let message = 'Error: ';
    if (error instanceof Error){
        message += error.message;
    }
    console.log(message);
}