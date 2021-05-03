// interface Input {
//     height: number,
//     weight: number
// }
// const parseArguments = (args: Array<string>): Input => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');
  
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//       return {
//         height: Number(args[2]),
//         weight: Number(args[3])
//       }
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
// }

export const calculateBmi = (height: number, weight: number):string =>{

    const h = height / 100;
    const bmi = weight / (h * h);
    
    let result : string = '';
    // console.log(bmi)
    if(bmi < 15){
        result = 'Very severly underweight';
        console.log(result); 
    }
    else if(bmi >= 15 && bmi < 16){
        result = 'Severly underweight'
        console.log(result);
    }
    else if(bmi >= 16 && bmi < 18.5){
        result = 'Underweight';
        console.log(result);
    }
    else if(bmi >= 18.5 && bmi < 25){
        result = 'Normal (healthy weight)';
        console.log(result);
    }
    else if(bmi >= 25 && bmi < 30){
        result = 'Overweight';
        console.log(result);
    }
    else if(bmi >= 30 && bmi < 35){
        result = 'Obese Class I (Moderately obese) ';
        console.log(result);
    } 
    else if(bmi >= 35 && bmi < 40){
        result = 'Obese Class II (Severely obese) ';
        console.log(result);
    }
    else if(bmi >= 40){
        result = 'Obese Class III (Very severely obese)';
        console.log(result);
    }
    return result
};

// try {
//     const { height, weight } = parseArguments(process.argv);
//     calculateBmi(height, weight);
//   } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
// }