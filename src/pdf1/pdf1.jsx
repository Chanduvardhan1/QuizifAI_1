import React, { useRef ,useState, useEffect} from 'react'
import QuizifAilogo from "../assets/Images/quiz-type/Quizifai 1.png";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

export default function pdf1 (){
const pdfRef1 = useRef(null);
const inputReff = useRef(null);
const [image, setImage] = useState("");
const currentDate = new Date();
const userRole = localStorage.getItem('user_role');
const FormattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

const [editableFields, setEditableFields] = useState({
    hallTicket: false,
    time: false,
    subjectCode: false,
    maxMarks: false,
    heading: false,
    question1: false,
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    mark1: false,

    question2: false,
    option11: false,
    option12: false,
    option13: false,
    option14: false,
    option111: false,
    option112: false,
    option113: false,
    option114: false,
    mark2: false,

    question3: false,
    option21: false,
    option22: false,
    option23: false,
    option24: false,
    mark3: false,

    question4: false,
    option31: false,
    option32: false,
    option33: false,
    option34: false,
    mark4: false,

});

const handleFieldClick = (field) => {
    if(userRole === 'Quiz Master')
    setEditableFields((prev) => ({ ...prev, [field]: true }));
};

const downloadPDF1 = async ()  =>{
    const input = pdfRef1.current;
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
useEffect(() =>{
    const savedImage = localStorage.getItem('savedImage');
    if(savedImage){
      setImage(savedImage);
    }
  },[]);
  
  function handleImageClick() {
    if (inputReff.current && typeof inputReff.current.click === 'function') {
      inputReff.current.click(); // Open file dialog
    } else {
      console.error('click method is not available on inputReff.current');
    }
  }
  
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        localStorage.setItem('savedImage', imageDataUrl);
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  }
  
    
  function handleReplaceImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    handleImageClick(); // Open file dialog
  }
  
  function handleDeleteImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    localStorage.removeItem('savedImage'); // Remove from local storage
    setImage(""); // Reset to default image
  }
  
  function handleViewImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    if (image) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = image;
      link.target = '_blank'; // Open in a new tab
      link.click(); // Simulate click to open the image
    } else {
      console.error('No image available to view');
    }
  }

  const navigate = useNavigate();
  const handleToPrint =() =>{
    navigate('/print')
  }

  useEffect(() =>{
     const savedContent = localStorage.getItem('savedPageContent');
    if (savedContent && pdfRef1.current) {
        pdfRef1.current.innerHTML = savedContent;
      }
    }, []);

  const handleSave = () =>{
    const content = pdfRef1.current.innerHTML;

    localStorage.setItem('savedContent', content);

    alert("Content saved successfully!");
  }
  return (
    <>
    <div className='h-full w-full' ref={pdfRef1}>
    <h1 className='font-serif font-bold text-center text-[25px] mt-20 focus:outline-none focus:border-none'
    onClick={() => handleFieldClick('hallTicket')}
    contentEditable={editableFields.hallTicket}
    >
    <span className='text-red-600 border-none'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION </span><br/>
    <span>SCIENCE</span> <br/>CLASS IX (THEORY)
    <br/>SAMPLE QUESTION PAPER - II <br/>2024</h1>

    <div className='h-[130px] w-[130px] border-4 border-solid focus:outline-none focus:border-none relative -mt-[140px] ml-32'>
    <div className="w-[100px] ml-[11px] h-[100px] mt-3" style={{ position: "relative" }}>
      {image ? (
        <img className="w-[100px] h-[100px] border-2 border-white" src={image} alt="Uploaded" />
      ) : (
        <img className="w-[100px] h-[100px] border-2 border-white" src={QuizifAilogo} alt="Default" />
      )}
      <input type="file" ref={inputReff} onChange={handleImageChange} style={{ display: "none" }} />

      <div className="w-fit h-[24px] px-[2px] py-[1px] relative left-16 -top-7">
        <div className="rounded-full w-fit h-[28px] px-[2px] py-[2px] flex items-center justify-center group">
          {/* <img className="h-4 w-4 relative -top-[3px] cursor-pointer" src={Camera} alt="Camera" /> */}
          <div className="absolute top-full text-[7px] left-0 right-[30px] mt-1 bg-white rounded-sm text-black w-fit h-[37px] cursor-pointer px-1 py-[2px] text-nowrap items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p onClick={handleReplaceImage}>Replace Image</p><br/>
            <p className="relative -top-[10px]" onClick={handleViewImage}>View Image</p><br/>
            <p className="relative -top-[20px]" onClick={handleDeleteImage}>Delete Image</p>
          </div>
        </div>
      </div>
    </div>
    </div>

            <div className='flex justify-between mt-14'>
                <div className='ml-32'>
                <div className='font-serif font-bold  text-[20px] focus:outline-none focus:border-none'
            onClick={() => handleFieldClick('hallTicket')}
            contentEditable={editableFields.hallTicket}
            >Hall Ticket No:</div>

            <div className='font-serif font-bold text-[20px] focus:outline-none focus:border-none'
            onClick={() => handleFieldClick('time')}
            contentEditable={editableFields.time}
            >Time:<span className='font-thin font-none pl-1'>60 Min</span></div>  
                </div>
            
            <div className='mr-24'>
            <div className='font-serif font-bold text-[20px] focus:outline-none focus:border-none'
            onClick={() => handleFieldClick('subjectCode')}
            contentEditable={editableFields.subjectCode}
            >Subject Code:</div>

            <div className='font-serif font-bold text-[20px] focus:outline-none focus:border-none'
            onClick={() => handleFieldClick('maxMarks')}
            contentEditable={editableFields.maxMarks}
            >Maximum Marks:<span className='font-thin font-none pl-1'>75</span></div>
            </div>
            </div>
            


            <h1 className='font-serif font-semibold text-center text-[25px] relative text-blue-900 mt-5 pl-20 -ml-20 focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('heading')}
             contentEditable={editableFields.heading}
             >Multiple Choice Questions</h1>

            <div className='flex'>
                <h1 className='pl-[200px] pt-[35px] text-bold font-serif text-[21px] pr-3'>1.</h1>
                <span className='pt-[40px] pr-[350px] focus:outline-none focus:border-none' 
                onClick={() => handleFieldClick('question1')}
                contentEditable = {editableFields.question1}>
                Seema visited a Natural Gas Compressing Unit and found that the gas can
                be liquefied under specific conditions of temperature and pressure. While
                sharing her experience with friends she got confused. Help her to identity
                the correct set of conditions.
                </span>
            </div>
            <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
            onClick={() => handleFieldClick('option1')}
            contentEditable = {editableFields.option1}>(a) Low temperature, low pressure</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option2')}
             contentEditable = {editableFields.option2}>(b) High temperature, low pressure</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option3')}
             contentEditable = {editableFields.option3}>(c) Low temperature, high pressure</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option4')}
             contentEditable = {editableFields.option4}>(d) High temperature, high pressure</span>
             <span className='pl-[330px] focus:outline-none focus:border-none' 
             onClick={() => handleFieldClick('mark1')}
             contentEditable= {editableFields.mark1}>(1)</span>

             <div className='flex'>
                <h1 className='pl-[200px] pt-[15px] text-bold font-serif text-[20px] pr-3'>2.</h1>
                <span className='pt-[18px] pr-[350px] focus:outline-none focus:border-none'
                onClick={() => handleFieldClick('question2')}
                contentEditable = {editableFields.question2}>
                Which of the following are physical changes?
                </span>
            </div>
            <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
            onClick={() => handleFieldClick('option11')}
            contentEditable = {editableFields.option11}>(i) Melting of iron metal</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option12')}
             contentEditable = {editableFields.option12}>(ii) Rusting of iron</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option13')}
             contentEditable = {editableFields.option13}>(iii) Bending of an iron rod</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option14')}
             contentEditable = {editableFields.option14}>(iv) Drawing a wire of iron metal</span><br/>

             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option111')}
             contentEditable = {editableFields.option112}>(a) (i), (ii) and (iii)</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option112')}
             contentEditable = {editableFields.option112}>(b) (i), (ii) and (iv)</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option113')}
             contentEditable = {editableFields.option113}>(c) (i), (iii) and (iv)</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option114')}
             contentEditable = {editableFields.option114}>(d) (ii), (iii) and (iv)</span>
             <span className='pl-[459px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('mark2')}
             contentEditable = {editableFields.mark2}>(1)</span>

             <div className='flex'>
                <h1 className='pl-[200px] pt-[10px] text-bold font-serif text-[20px] pr-3'>3.</h1>
                <span className='pt-[14px] pr-[350px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('question3')}
             contentEditable = {editableFields.question3}>
                Which one of the following has maximum number of atoms?
                </span>
            </div>
            <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option21')}
             contentEditable = {editableFields.option21}>(a) 18 g of H2O</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option22')}
             contentEditable = {editableFields.option22}>(b) 18 g of O2</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option23')}
             contentEditable = {editableFields.option23}>(c) 18 g of CO2</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option24')}
             contentEditable = {editableFields.option24}>(d) 18 g of CH4</span>
             <span className='pl-[479px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('marks3')}
             contentEditable = {editableFields.mark3}>(1)</span>

             <div className='flex'>
                <h1 className='pl-[200px] pt-[15px] text-bold font-serif text-[20px] pr-3'>4.</h1>
                <span className='pt-[17px] pr-[350px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('question4')}
             contentEditable = {editableFields.question4}>
                In a sample of ethyl ethanoate (CH3COOC2H5) the two oxygen atoms have
                the same number of electrons but different number of neutrons. Which of
                the following is the correct reason for it?
                </span>
            </div>
            <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option31')}
             contentEditable = {editableFields.option31}>(a) One of the oxygen atoms has gained electrons</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option32')}
             contentEditable = {editableFields.option32}>(b) One of the oxygen atoms has gained two neutrons</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option33')}
             contentEditable = {editableFields.option33}>(c) The two oxygen atoms are isotopes</span><br/>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option34')}
             contentEditable = {editableFields.option34}> (d) The two oxygen atoms are isobars.</span>
             <span className='pl-[320px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('mark4')}
             contentEditable = {editableFields.mark4}>(1)</span>

             <h1 className='text-xs pl-[1000px] pt-10 pb-10 font-semibold'>{FormattedDate}</h1>
             <div className='flex gap-5 mb-5 justify-center'>
             <button 
          className='bg-[#223F80] rounded-md text-white px-3 py-1 hover:bg-[#EF5130]'
          onClick={handleSave} // Attach the save function here
        >
          Save
        </button>            
        <button className='bg-[#223F80] rounded-md text-white px-3 py-1 relative  hover:bg-[#EF5130]' onClick={downloadPDF1}>Download PDF</button>
             <button className='bg-[#223F80] rounded-md text-white px-3  hover:bg-[#EF5130]' onClick={handleToPrint}>Print</button>
             </div>


    </div>
    </>
    
  )
};