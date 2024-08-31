"use client";
import React, { useState,useEffect } from "react";
import Navigation from "../navbar/navbar";

export default function print() {
  const [showCopiesText, setShowCopiesText] = useState(false);
  const [numCopies, setNumCopies] = useState(0);
  const [printOption, setPrintOption] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
      document.getElementById('printable-content').innerHTML = savedContent;
    }
  }, []);

  const handlePrint = () => {
    const contentElement = document.getElementById('printable-content');
    
    if (contentElement) {
      // const content = contentElement.innerHTML;
      // const printWindow = window.open('', '', 'height=600,width=800');
      let content = contentElement.innerHTML;

      // Modify content based on selected print option
      switch (printOption) {
        case 'questionPaperOnly':
          break;
        case 'questionPaperPlusAnswerKey':
          // Add bold formatting for correct answers
          content = content.replace(/(correct answer regex)/g, '<b>$1</b>'); // Replace with actual regex or logic
          break;
        case 'answerKeyOnly':
          // Filter content to include only answers, make them bold
          content = content.replace(/(answer key regex)/g, '<b>$1</b>'); // Replace with actual regex or logic
          break;
        default:
          console.error('Invalid print option');
          return;
      }

      // Repeat the content based on the number of copies
      let repeatedContent = '';
      for (let i = 0; i < numCopies; i++) {
        repeatedContent += content;
      }
      
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(repeatedContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Printable content not found');
    }
    //   printWindow.document.write('<html><head><title>Print</title>');
    //   printWindow.document.write('</head><body>');
    //   printWindow.document.write(repeatedContent);
    //   printWindow.document.write('</body></html>');

    //   printWindow.document.close();
    //   printWindow.print();
    // } else {
    //   console.error('Printable content not found');
    // }
  };

  return (
    <>
      <div className="flex font-Poppins">
        <Navigation/>
        <main className="w-full bg-gradient-to-b from-[#CEE4FF80] via-[#E2EFFF80] to-[#EEF6FF80]">
          <h1 className="text-[30px] text-[#F25822] text-center font-bold leading-10 mt-12">Print</h1>
          <div className="ml-20 mt-5">
            <div className="flex items-center">
              <label className="font-bold text-[15px] leading-10 text-[#1B1852]">
                <input
                  type="radio"
                  name="printOption"
                  value="questionPaperOnly"
                  checked={printOption === 'questionPaperOnly'}
                  onChange={() => setPrintOption('questionPaperOnly')}
                />
                <span className="ml-2">Print only Question Paper</span>
              </label>
              <input
                className="w-12 h-9 border-[1px] border-gray-300 rounded-[10px] ml-3"
                type="number"
                min="1"
                value={numCopies}
                onChange={(e) => setNumCopies(Number(e.target.value))}
              />
              <sup
                className="-mt-4 ml-2 font-semibold cursor-pointer"
                onClick={() => setShowCopiesText(!showCopiesText)}
              >
                i
              </sup>
              {showCopiesText && (
                <span className="-mt-3 ml-2 text-[14px] text-gray-600">Enter number of copies</span>
              )}
            </div>
            <label className="font-bold text-[15px] leading-10 text-[#1B1852]">
              <input
                type="radio"
                name="printOption"
                value="questionPaperPlusAnswerKey"
                checked={printOption === 'questionPaperPlusAnswerKey'}
                onChange={() => setPrintOption('questionPaperPlusAnswerKey')}
              />
              <span className="ml-2">Print Question Paper + Answer Key</span>
            </label><br />
            <label className="font-bold text-[15px] leading-10 text-[#1B1852]">
              <input
                type="radio"
                name="printOption"
                value="answerKeyOnly"
                checked={printOption === 'answerKeyOnly'}
                onChange={() => setPrintOption('answerKeyOnly')}
              />
              <span className="ml-2">Print only Answer Key</span>
            </label>
          </div>
          <div id="printable-content">
            {/* The content is dynamically loaded from localStorage */}
          </div>
          <div className="flex justify-end mr-40 relative mt-auto mb-10">
            <button
              className="text-[15px] font-medium leading-[22.5px] align-middle text-white bg-[#214082] rounded-[10px] px-9 py-1"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </main>
      </div>
    </>
  );
};
