import React from 'react'
import Navbarhome from '../navbarhome/navbarhome'
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";




const termsandconditions = () => {

    const navigate = useNavigate();
const handleBackToDashboard = () => {
    navigate("/signup");
  };
  return (
    <body class="bg-gray-100 overflow-hidden">
        <Navbarhome/>
    <div class="container mx-auto overflow-hidden p-4">
        <div>
             {/* <button className='text-xl border px-5 bg-[#3B61C8] rounded-2xl text-white ml-[320px]' onClick={handleBackToDashboard}>close</button> */}
          <button>   <CgCloseO className='ml-[380px] w-[50px] h-[25px]' onClick={handleBackToDashboard}/></button>
        </div>
        <h1 class="text-3xl font-semibold mb-4">QuizifAI Terms and Conditions</h1>
        <section class="bg-white shadow-md rounded-md p-6">
            <h2 class="text-xl font-semibold mb-4">Account Creation</h2>
            <ul class="list-disc list-inside mb-4">
                <li>Sign up with correct info.</li>
                <li>Keep your account details secret.</li>
                <li>Tell us right away if someone uses your account without permission.</li>
            </ul>
            <h2 class="text-xl font-semibold mb-4">User Conduct</h2>
            <ul class="list-disc list-inside mb-4">
                <li>Follow the rules and laws.</li>
                <li>You're responsible for what you share.</li>
            </ul>
            <h2 class="text-xl font-semibold mb-4">Age</h2>
            <p class="list-disc list-inside mb-4">Children below 12 years old can use the QuizifAI application with parents' credentials/approval/supervision.</p>
            <h2 class="text-xl font-semibold mb-4">Privacy and Safety Guidelines</h2>
            <p class="list-disc list-inside mb-4">Personal Information: Your privacy matters. We don't ask for personal details unless necessary, and we keep them safe.</p>
            <h2 class="text-xl font-semibold mb-4">Stay Safe Tips</h2>
            <p class="list-disc list-inside mb-4">Speak Up: If something doesn't feel right, talk to a trusted adult or use the report feature.</p>
            <h2 class="text-xl font-semibold mb-4">Intellectual Property</h2>
            <p >All content provided through the Service, including text, images, and software, is protected by intellectual property laws.</p>
            <p class="list-disc list-inside mb-4">You may not reproduce, distribute, or modify any content without prior written consent.</p>
            <h2 class="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p>We strive to provide a reliable Service, but we do not guarantee uninterrupted or error-free operation.</p>
            <p class="list-disc list-inside mb-4">We are not liable for any damages arising from the use or inability to use the Service.</p>
            <h2 class="text-xl font-semibold mb-4">Right to Modify</h2>
            <p class="list-disc list-inside mb-4">Reserve the right to update the terms and conditions and how users will be notified.</p>
            <h2 class="text-xl font-semibold mb-4">Modifications</h2>
            <p>We may update or modify these terms at any time without prior notice.</p>
            <p>It is your responsibility to review the terms periodically for any changes.</p>
            <p>By signing up for the Service, you acknowledge that you have read, understood, and agree to abide by these terms. If you do not agree with any part of these terms, please do not proceed with signing up.</p>
        </section>
    </div>
</body>
  )
}

export default termsandconditions