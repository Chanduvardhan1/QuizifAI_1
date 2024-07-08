import React from 'react'
import { Link } from "react-router-dom";
import quizifailogo from "../assets/Images/history/Quizifai 1.png";
import Lady from "../assets/Images/images/contact/lady.png";
import ContactMail from "../assets/Images/images/contact/ContactMail.png";
import Tick from "../assets/Images/images/contact/tick.png";

export default function  contact () {
  return (
    <>
    <div className="logo">
          <Link to={"/"}>
            <img className='w-[210px] h-[173px] absolute -top-5' src={quizifailogo} alt="Logo" />
          </Link>
        </div>
        <div>
            <img className='h-[370px] w-[390px] absolute top-[100px] left-[220px]' src={Lady} alt='contact image'/>
        </div>

        <div className='absolute top-[390px] left-[30px] text-[14px] font-semibold'>   
        <img className='h-[30px] w-[30px] relative left-[210px] top-[70px]' src={ContactMail} alt="Logo 2" />
              <a className="absolute left-[249px] text-[#214082] top-[75px] underline font-Poppins text-[13px]" href="mailto:info@quizifai.com">info@quizifai.com</a>
              <p className="absolute left-[378px] text-[#214082] top-[73px]">|</p><br/>
              <a className="absolute left-[390px] text-[#214082] top-[75px] underline font-Poppins text-[13px]" href="mailto:sales@quizifai.com">sales@quizifai.com</a>
        </div>

        <div>
            <h1 className='text-[24px] font-Poppins text-[#214082] font-medium absolute left-[800px] top-[100px]
            '>Mail sent successfully!</h1>
            <img className='h-[200px] w-[200px] absolute top-[120px] left-[840px]' src={Tick} alt='success image'/>
            <h1 className='text-[#214082] text-[17px] absolute left-[800px] top-[300px] font-medium font-Poppins'>Thank you for reaching out to us! <br/>
            <span className='-ml-[45px]'>Your message has been successfully received.</span><br/> We'll be in touch with you shortly.</h1>
            <h1 className='absolute left-[800px] top-[420px] text-[#214082] font-Poppins'>Click <a className='font-bold underline' href='/'>here</a> for redirecting to the home page</h1>
        </div>

     </>
  )
};

