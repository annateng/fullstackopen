interface BmiArgs {
  heightCm: number;
  weightKg: number;
}

export const getBmiArgs = (args: string[]): BmiArgs => {
  if (args.length != 4 || isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw new Error ('2 command line args needed: heightCm and weightKg');
  return {
    heightCm: Number(args[2]),
    weightKg: Number(args[3])
  };
}; 

export const calculateBmi = (bmiArgs: BmiArgs): string => {
  const bmi: number = bmiArgs.weightKg / bmiArgs.heightCm / bmiArgs.heightCm * 10000;

  if (bmi < 18.5) return "underweight";
  else if (bmi <= 25) return "normal";
  else if (bmi <= 30) return "overweight";
  else return "obese";
};

// console.log(calculateBmi(getBmiArgs(process.argv)));