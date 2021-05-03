interface Result {
    periodLength: number,
    trainingDays: Number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
} 

const parsedArguments = (args: Array<string>):number[] => {
    
    let hours: number[] = []
    let i = 0;
    if (!isNaN(Number(args[2]))){
        for(let i=2;i<args.length;i++){
            hours.push(Number(args[i]));
        }
        return hours
        
    } else {
      throw new Error('Provided values were not numbers!');
    }
}


const calculateExercises = (hours:number[]): Result => {

    let days = 0;
    let h = 0;
    let mx = 0;
    for(let i=0;i < hours.length;i++){
        if( h > mx) {
            mx = h;
        }
        h += hours[i];
        if(hours[i] != 0) days++; 
    }

    let target = mx * hours.length;
    let average = h / hours.length;

    let rating = 0;

    if(average < 2)
        rating = 1;
    else if(average >=2 && average < 3)
        rating = 2;
    else 
        rating = 3;

    let desc = '';
    if(rating == 1) {
        desc = 'Poor performace';
    }
    else if(rating == 2) {
        desc = 'Average performance';
    }
    else {
        desc = 'Nice performance';
    }

    return {
        periodLength: Number(hours.length),
        trainingDays: Number(days),
        success: true,
        rating: rating,
        ratingDescription: 'I am good',
        target: target,
        average: average
    }

}


try {
    const arr = parsedArguments(process.argv);
    console.log(calculateExercises(arr));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}