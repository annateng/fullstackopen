interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  average: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: 'bad' | 'okay' | 'good',
  target: number
}

interface ExerciseInput {
  eData: Array<number>,
  eTarget: number
}

const getExerciseCalculatorArgs = (args: Array<string>): ExerciseInput => {
  const a = args.slice(2);
  
  if (a.length < 3) throw new Error ('Not enough arguments. you need to have at least 1 day of exercise data');
  a.forEach(n => { if (isNaN(Number(n))) throw new Error ('args must be numbers') })

  const eTarget = Number(a[0])
  const eData = a.slice(1).map(n => Number(n));

  return { eData, eTarget }
} 

const calculateExercises = (eArgs: ExerciseInput): ExerciseResults => {
  const eData = eArgs.eData;
  const eTarget = eArgs.eTarget;

  const periodLength: number = eData.length;
  const trainingDays: number = eData.filter(d => d > 0).length;
  const average: number = eData.reduce((sum, d) => sum + d, 0) / periodLength;
  const success = average >= eTarget;
  const rating: 1 | 2 | 3 = average > eTarget + 5 ? 3 : success ? 2 : 1;
  const ratingDescription: 'bad' | 'okay' | 'good' = rating === 1 ? 'bad' : rating === 2 ? 'okay' : 'good';
  
  return {
    periodLength, trainingDays, average, success, rating, ratingDescription,
    target: eTarget
  }
}

console.log(calculateExercises(getExerciseCalculatorArgs(process.argv)));