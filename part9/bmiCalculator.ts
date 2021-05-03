const calculateBmi = (height: number, weight: number) =>{

    const h = height / 100;
    const bmi = weight / (h * h);
    
    // console.log(bmi)
    if(bmi < 15){
        console.log('Very severly underweight');
    }
    else if(bmi >= 15 && bmi < 16){
        console.log('Severly underweight');
    }
    else if(bmi >= 16 && bmi < 18.5){
        console.log('Underweight');
    }
    else if(bmi >= 18.5 && bmi < 25){
        console.log('Normal (healthy weight)');
    }
    else if(bmi >= 25 && bmi < 30){
        console.log('Overweight');
    }
    else if(bmi >= 30 && bmi < 35){
        console.log('Obese Class I (Moderately obese) ');
    } 
    else if(bmi >= 35 && bmi < 40){
        console.log('Obese Class II (Severely obese) ');
    }
    else if(bmi >= 40){
        console.log('Obese Class III (Very severely obese)');
    }
    
}
calculateBmi(180, 74);