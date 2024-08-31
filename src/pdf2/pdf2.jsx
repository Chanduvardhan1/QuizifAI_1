import React, {useRef, useState} from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QuizifAilogo from "../assets/Images/quiz-type/Quizifai 1.png";

export default function pdf2 (){
  const userRole = localStorage.getItem('user_role');
  const[editableFields, setEditableFields] = useState({
    heading: false,
    title: false,
    question1: false,
    option1: false,
    option2: false,
    option3: false,
    option4: false,

    question2: false,
    option11: false,
    option12: false,
    option13: false,
    option14: false,

    question3: false,
    option21: false,
    option22: false,
    option23: false,
    option24: false,
  });
  const handleFieldClick = (field) => {
    if(userRole === 'Quiz Master')
    setEditableFields((prev) => ({ ...prev, [field]: true }));
};
    const reportTemplateRef = useRef(null);
  const downloadPDF2 = async ()=>{
    const input = reportTemplateRef.current;

    try{
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation:"portrait",
            unit: 'px',
            format:"a4"
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width)/canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, width,height);
        pdf.save("document1.pdf");
    
    }catch(error){
        console.error("Error generating PDF:",error);
    }
    

  };

  return (
    <>
    <div className='h-[1000px] w-full' ref={reportTemplateRef}>
    <div className='h-[150px] w-full bg-amber-50'>
     <h1 className='text-[30px] font-semibold font-serif pl-[200px] pt-[30px] focus:outline-none focus:border-none'
      onClick={() => handleFieldClick('heading')}
      contentEditable={editableFields.heading}
      >Online Quiz</h1>
              <p className=' pl-[200px] pt-[10px] text-lg font-semibold focus:outline-none focus:border-none'
               onClick={() => handleFieldClick('title')}
               contentEditable={editableFields.title}>Yoh have 45  minutes to take the quiz</p>
               
              <img className='h-[300px] w-[270px]  absolute -top-[80px] left-[860px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
              <h1 className='pl-5 pt-[80px]'>1.<span className='font-Poppins focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('question1')}
              contentEditable={editableFields.question1}>
            Which of the following is not a correct way to state a null hypothesis?
             </span></h1>
          
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options1' value='option-1'
             onClick={() => handleFieldClick('option1')}
             contentEditable={editableFields.option1}>
             H0: ˆ ˆ 0 p1 − p2 = 0 </span><br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options1' id='female' value='option-2'
             onClick={() => handleFieldClick('option2')}
             contentEditable={editableFields.option2}>
             H0: µd = 10</span><br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options1' id='female' value='option-3'
             onClick={() => handleFieldClick('option3')}
             contentEditable={editableFields.option3}>
             H0: µ1 − µ2 = 0 </span><br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options1' id='female' value='option-4'
             onClick={() => handleFieldClick('option4')}
             contentEditable={editableFields.option4}>
             H0: p = .5 </span>

             <h1 className='pl-5 pt-[20px]'>2. <span className='font-Poppins focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('question2')}
             contentEditable={editableFields.question2}>
             A result is called “statistically significant” whenever
             </span></h1>
             
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options2' value='option-1' 
             onClick={() => handleFieldClick('option11')}
             contentEditable={editableFields.option11}>The null hypothesis is true.</span><br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options2' id='female' value='option-2' 
             onClick={() => handleFieldClick('option12')}
             contentEditable={editableFields.option12}>The alternative hypothesis is true.</span><br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options2' id='female' value='option-3' 
             onClick={() => handleFieldClick('option13')}
             contentEditable={editableFields.option13}>The p-value is less or equal to the significance level</span> <br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options2' id='female' value='option-4' 
             onClick={() => handleFieldClick('option14')}
             contentEditable={editableFields.option14}>The p-value is larger than the significance level.</span>

             <h1 className='pl-5 pt-[20px]'>3. <span className='font-Poppins focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('question3')}
             contentEditable={editableFields.question3}>
             A test of H0: µ = 0 versus Ha: µ 0 is conducted on the same population independently<br/> by two
             different researchers. They both use the same sample size and the same value of <br/>α = 0.05. Which of
             the following will be the same for both researchers? 
             </span></h1>
             
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options3' value='option-1' 
             onClick={() => handleFieldClick('option21')}
             contentEditable={editableFields.option21}>The p-value of the test.</span> <br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options3' id='female' value='option-2' 
             onClick={() => handleFieldClick('option22')}
             contentEditable={editableFields.option22}>The power of the test if the true µ = 6.</span> <br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options3' id='female' value='option-3' 
             onClick={() => handleFieldClick('option23')}
             contentEditable={editableFields.option23}>The value of the test statistic.</span> <br/>
             <span className='ml-8 text-xs focus:outline-none focus:border-none' type='radio' name='options3' id='female' value='option-4' 
             onClick={() => handleFieldClick('option24')}
             contentEditable={editableFields.option24}>The decision about whether or not to reject the null hypothesis.</span>  
        
    </div>
    <button className='bg-blue-400 rounded-md px-3 py-3 relative left-[50px] top-[550px] mb-10 hover:bg-blue-300' onClick={downloadPDF2}>Download PDF</button>
  </div>
     

    </>
  )
}

