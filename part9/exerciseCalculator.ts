interface results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1|2|3,
    ratingDescription: "potato"|"human"|"beast",
    target: number,
    average: number
}

const calculateExercises = (record: number[], originalTarget: number): results => {
    try {
        const periodLength = record.length;
        const trainingDays = record.filter(hours => hours > 0).length;
        const average = record.reduce((a,b) => a+b, 0)/periodLength;
        const success = average >= originalTarget;
        const rating = average < 0.5? 1: (average < 2? 2 : 3);
        const ratingDescription = rating === 1? "potato": (rating === 2? "human": "beast");
        return {
            periodLength,
            trainingDays,
            success,
            rating,
            ratingDescription,
            target: originalTarget,
            average
        };
    }
    catch (error: unknown){
        let message = "Something went wrong: "
        if (error instanceof Error) {
            message += error.message;
        }
        console.log(message)
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));