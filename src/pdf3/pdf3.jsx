import React, { useRef } from 'react'
import QuizifAilogo from "../assets/Images/quiz-type/Quizifai 1.png";
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

export default function  pdf3 (){
    const pdfRef3 = useRef(null);
    const downloadPDF3 = async ()  =>{
        const input = pdfRef3.current;

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
            pdf.save("document.pdf");
        
        }catch(error){
            console.error("Error generating PDF:",error);
        }


    };

  return (
    <>
     <div className='h-[1700px] w-full pt-[30px]'ref={pdfRef3}>
       <div className='mt-10'>
       <h1 className='font-serif font-bold text-center relative -top-[20px] -left-[350px] text-[25px] mt-[50px]'>KENDRIYA VIDYALAYA SANGATHAN,</h1>
       <h1 className='font-serif font-bold text-center relative -top-[105px] -left-[470px] text-[25px] mt-20'>RAIPUR REGION</h1>
       <h1 className='font-serif font-bold text-center relative -top-[190px] -left-[525px] text-[20px] mt-20'>SCIENCE<br/> <span className='pl-[100px]'>CLASS IX (THEORY)</span><br/> 
       <span className='pl-[200px]'>SAMPLE QUESTION PAPER - II</span><br/><span className='-ml-[35px]'>2024</span></h1>
       <img className='h-[250px] w-[300px]  absolute top-[30px] left-[500px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />

       <h1 className='font-serif font-bold text-left relative -top-[320px] pl-[950px]  text-[20px]'>Subject Code:</h1>
       <h1 className='font-serif font-bold text-left relative -top-[320px] pl-[950px] text-[20px]'>Maximum Marks:<span className='font-thin font-none pl-1'>75</span></h1>
        <h1 className='-mt-[170px] px-[150px] font-semibold font-serif text-[23px]'>
        Sample Multiple Choice Questions for the material since Midterm 2. Sample questions from
        Midterms 1 and 2 are also representative of questions that may appear on the final exam. 
        </h1>


            <div className='flex'>
                <h1 className='pl-[150px] pt-[30px] text-bold font-serif text-[20px] pr-3'>1.</h1>
                <span className='pt-[35px]'>
                A randomly selected sample of 1,000 college students was asked whether they had ever used the drug
                Ecstasy. Sixteen percent<br/> (16% or 0.16) of the 1,000 students surveyed said they had. Which one of
                the following statements about the number 0.16 is correct? 
                </span><br/>
            </div>
    
             <span className=' font-serif pl-[180px] pt-5'>A. It is a sample proportion. </span><br/>
             <span className=' font-serif pl-[180px]'>B. It is a population proportion. </span><br/>
             <span className=' font-serif pl-[180px]'>C. It is a margin of error. </span><br/>
             <span className=' font-serif pl-[180px]'>D. It is a randomly chosen number. </span>

             <div className='flex'>
                <h1 className='pl-[150px] pt-[30px] text-bold font-serif text-[20px] pr-3'>2.</h1>
                <span className='pt-[35px]'>
                In a random sample of 1000 students, pˆ = 0.80 (or 80%) were in favor of longer hours at the school
                library. The standard error of<br/> pˆ (the sample proportion) is 
                </span><br/>
            </div>
    
             <span className=' font-serif pl-[180px] pt-5'>A. .013</span><br/>
             <span className=' font-serif pl-[180px]'>B. .160 </span><br/>
             <span className=' font-serif pl-[180px]'>C. .640 </span><br/>
             <span className=' font-serif pl-[180px]'>D. .800</span>

             <div className='flex'>
                <h1 className='pl-[150px] pt-[30px] text-bold font-serif text-[20px] pr-3'>3.</h1>
                <span className='pt-[35px]'>
                For a random sample of 9 women, the average resting pulse rate is x = 76 beats per minute, and the
                sample standard deviation<br/> is s = 5. The standard error of the sample mean is 

                </span><br/>
            </div>
    
             <span className=' font-serif pl-[180px] pt-5'>A. 0.557</span><br/>
             <span className=' font-serif pl-[180px]'>B. 0.745 </span><br/>
             <span className=' font-serif pl-[180px]'>C. 1.667 </span><br/>
             <span className=' font-serif pl-[180px]'>D. 2.778</span>


             <div className='flex'>
                <h1 className='pl-[150px] pt-[30px] text-bold font-serif text-[20px] pr-3'>4.</h1>
                <span className='pt-[35px]'>
                Assume the cholesterol levels in a certain population have mean µ= 200 and standard deviation σ =
                24. The cholesterol levels for<br/> a random sample of n = 9 individuals are measured and the sample
                mean x is determined. What is the z-score for a sample mean x = 180? 
                </span><br/>
            </div>
    
             <span className=' font-serif pl-[180px] pt-5'>A. –3.75 </span><br/>
             <span className=' font-serif pl-[180px]'>B. –2.50  </span><br/>
             <span className=' font-serif pl-[180px]'>C. –0.83  </span><br/>
             <span className=' font-serif pl-[180px]'>D. 2.50</span>

             <div className='flex'>
                <h1 className='pl-[150px] pt-[30px] text-bold font-serif text-[20px] pr-3'>5.</h1>
                <span className='pt-[35px]'>
                In a past General Social Survey, a random sample of men and women answered the question “Are you
                a member of any sports clubs?”<br/> Based on the sample data, 95% confidence intervals for the
                population proportion who would answer “yes” are .13 to .19 for women<br/> and .247 to .33 for men.
                Based on these results, you can reasonably conclude that 
                </span><br/>
            </div>
    
             <span className=' font-serif pl-[180px] pt-5'>A. At least 25% of American men and American women belong to sports clubs. </span><br/>
             <span className=' font-serif pl-[180px]'>B. At least 16% of American women belong to sports clubs.</span><br/>
             <span className=' font-serif pl-[180px]'>C. There is a difference between the proportions of American men and American women who belong to sports clubs.</span><br/>
             <span className=' font-serif pl-[180px]'>D. There is no conclusive evidence of a gender difference in the proportion belonging to sports clubs.</span>
        </div> 
        <button className='bg-blue-400 rounded-md px-3 py-3 relative left-[550px] mb-10 hover:bg-blue-300 mt-10' onClick={downloadPDF3}>Download PDF</button>
        
    </div>
    </>
  )
};

