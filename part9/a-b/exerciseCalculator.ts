interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
    }

interface ExerciseValues {
    target: number;
    hours: Array<number>;
    }

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const hours = args.slice(3).map(h => Number(h));
    if (isNaN(target) || hours.some(h => isNaN(h))) {
        throw new Error('Provided values were not numbers!');
    }
    return {
        target,
        hours
    };
};

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(h => h > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const targetReached = average >= target;
  let rating = 0;
  let ratingDescription = '';
  if (average < target / 2) {
    rating = 1;
    ratingDescription = 'You underperformed, try harder next time!';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'Good job!';
  }
    return {
        periodLength,
        trainingDays,
        success: targetReached,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, hours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateExercises };