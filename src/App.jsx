import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./home/home.jsx";
import NoPage from "./pages/NoPage.jsx";
import Signup from "./signup/signup.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./login/login.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
import Quizcreated from "./quizcreated/quizcreated.jsx";
import Quizresults from "./quizresults/quizresults.jsx";
import Quizview from "./quizview/quizview.jsx";
// import Contact from "./contact/contact.jsx";

import QuizAccess from "./quizaccess/quizAccess.jsx";


// import Schedule from "./schedule/schedule.jsx";
// import Useradmin from "./useradmin/useradmin.jsx";
// import Subscription from "./subscription/subscription.jsx";
// import Quizmaster from "./quizmaster/quizmaster.jsx";
// import Quizadmin from "./quizadmin/quizadmin.jsx";
import Register from "./register/register.jsx";

// import History from "./history/history.jsx"
import Createquiz from "./create-quiz/create-quiz.jsx"
import Csv from "./csv/csv.jsx"
// import Detailedreport from "./detailed-report/detailed-report.jsx"
// import Enterquiz from "./enter-quiz/enter-quiz.jsx"
// import Freequiz from "./free-quiz/free-quiz.jsx"
import Textbook from "./textbook/textbook.jsx"
import Quiztype from "./quiz-type/quiz-type.jsx"
import Pdf from "./pdf/pdf.jsx"
// import Print from "./print/print.jsx"
// import Publish from "./publish/publish.jsx"
// import Orgadmin from "./org-admin/org-admin.jsx"
// import Orgadmin1 from "./org-admin1/org-admin1.jsx"
// import Paidversion from "./paid-version/paid-version.jsx"
// import Useradministration from "./user-administration/user-administration.jsx"
// import Printquizresults from "./print-quizresults/print-quizresults.jsx"
// import Pdf1 from "./pdf1/pdf1.jsx"
// import Pdf2 from "./pdf2/pdf2.jsx"
// import Pdf3 from "./pdf3/pdf3.jsx"

import Quizcreated1 from "./quizcreated1/quizcreated1.jsx";
import Quizview1 from "./quizview1/quizview1.jsx";
import Navigation from "./navbar/navbar.jsx"
import LogoutBar from "./logoutbar/logoutbar.jsx"

// import Notification from "./notification/notification.jsx";
import Quiz from "./quiz/quiz.jsx";
// import Profile from "./profile/profile.jsx";
///import DashboardQuizmaster from "./dashboard-quizmaster/dashboard-quizmaster.jsx";
// import Superadmin from "./dashboard-superadmin/dashboard-superadmin.jsx";
import FreeProfile from "./free-profile/free-profile.jsx";
// import OldPassword from "./free-profile/old-password.jsx";
import Configure from "./configure/configure.jsx";
import Category from "./configure/category.jsx";
import Navbarhome from "./navbarhome/navbarhome.jsx";
import LeftBar from "./leftbar/leftbar.jsx";
// import QuestionsPage from "./quiz-results/quiz-results.jsx";
import Questions from "./quiz-results1/quiz-results1.jsx";
// import DashboardQuizmaster from "./dashboard-quizmaster/dashboard-quizmaster.jsx";
import QuizView from "./quiz-view/quiz-view.jsx";
// import Orgadmin3 from "./quizmaster-orgadmin/quizmaster-orgadmin.jsx";
import QuizQuestions from "./quizquestions/quizquestions.jsx";
import ResendOTP from "./resendotp/resendotp.jsx";
// import SuperadminProfile from "./superadmin-profile/superadmin-profile.jsx";
// import Superadmins from "./superadmin/superadmin.jsx";
// import Superadmin1 from "./superadmin1/superadmin1.jsx";
import Resetpassword from "./reset-password/restpassword.jsx";
import Contact from "./contactus/contactus.jsx";
import Contact1 from "./contact/contact.jsx";
import Termsandconditions from "./termsandconditions/termsandconditions.jsx";
import Resetpasswordmobile from "./restpasswordmobile/restpasswordmobile.jsx";

import Quizcreated2 from "./quizcreated-textbook/quizcreated2.jsx";
// import Createeditquiz from "./create-editquiz/create-editquiz.jsx";
import Editmanuly from "./edit-manuly/editmanuly.jsx";
// import Editexcel from "./edit-excel/editexcel.jsx";
// import Editpdf from "./edit-pdf/editpdf.jsx";
// import Edittextbook from "./edit-textbook/edittextbook.jsx";
import Quizresults1 from "./quizview_results/quiz_results.jsx";
import Leaderboard from "./leaderboard/leaderboard.jsx";
import PrivateRoute from './privateRoute/privateRoute.jsx';
// import Home from "./pages/Home.jsx";
// import ContactUs from "./pages/ContactUs.jsx";
// import NoPage from "./pages/NoPage.jsx";
// import Offerings from "./pages/Offerings.jsx";
// import Consulting from "./pages/Consulting.jsx";
// import Legal from "./pages/Legal.jsx";
// import IT from "./pages/IT.jsx";
// import Edu from "./pages/Edu.jsx";
// import Agri from "./pages/Agri.jsx";
// import AboutUs from "./pages/Aboutus.jsx";
// import OurTeam from "./pages/OurTeam.jsx";
// import monicaImg from "./assets/brand/monica.png";
// import close from "./assets/brand/close.png";
// import Aibot from "./pages/Aibot.jsx";

// const location = useLocation();
// const searchParams = new URLSearchParams(location.search);
// const email = searchParams.get('email');

// // Now you have access to the token
// console.log('Token:', email);
// const navigate = useNavigate();
// const handleVerification = async (email) => {

//   try {
//     // Assuming 'method' and 'otp' are defined elsewhere in your code
//     const method = "email"; // or whichever method you're using for verification
//     const otp = "123456"; // or the OTP you're using for verification

//     const response = await fetch("https://quizifai.com:8010/verification", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         accept: "application/json",
//       },
//       body: JSON.stringify({
//         verify_option: method,
//         email_or_mobile: email,
//         otp: otp,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//     // router.push("/login");
//     if (response.ok) {
//       // Redirect to the Register page
//       navigate("/Register");
//     } else {
//       // Handle other responses
//       navigate("../"); // Handle response data as per your application's logic
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
// if (email) {
//   // If email is not undefined, call the handleVerification function
//   handleVerification(email);
// } else {
//   console.error("Email is undefined");
// }
// function VerificationHandler() {

//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const searchParams = new URLSearchParams(search);
//   const email = searchParams.get("email");

//   useEffect(() => {
 

//     const handleVerification = async (email) => {
//       try {
//         // Assuming 'method' and 'otp' are defined elsewhere in your code
//         const method = "email"; // or whichever method you're using for verification
//         const otp = "123456"; // or the OTP you're using for verification

//         const response = await fetch("https://quizifai.com:8010/verification", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             accept: "application/json",
//           },
//           body: JSON.stringify({
//             verify_option: method,
//             email_or_mobile: email,
//             otp: otp,
//           }),
//         });

//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//           // Redirect to the Register page
//           navigate("/Register");
//         } else {
//           // Handle other responses
//           navigate("/"); // Handle response data as per your application's logic
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     if (email) {
//       handleVerification(email);
//     } else {
//       console.error("Email is undefined");
//     }
//   }, [email]);
// }
  
 
// function VerificationHandler() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const email = searchParams.get("email");

//   useEffect(() => {
//     const handleVerification = async (email) => {
//       try {
//         // Assuming 'method' and 'otp' are defined elsewhere in your code
//         const method = "email"; // or whichever method you're using for verification
//         const otp = "123456"; // or the OTP you're using for verification

//         const response = await fetch("https://quizifai.com:8010/verification", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             accept: "application/json",
//           },
//           body: JSON.stringify({
//             verify_option: method,
//             email_or_mobile: email,
//             otp: otp,
//           }),
//         });

//         const data = await response.json();
//       console.log(data);
//       if (response.ok) {
//         // Redirect to the Register page
//         navigate("/Register");
//       } else {
//         // Handle other responses
//         if (response.response === "fail" && data.detail === "Link has expried") {
//           // Handle expired link
//           alert("Verification link expired");
//           navigate("/"); 
//           // Redirect or display a message indicating that the link has expired
//         } else {
//           // Handle other errors
//           console.error("Error:", data.error || "Unknown error");
//           // Redirect or display a generic error message
//           navigate("/"); // Redirect to the home page for example
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//     if (email) {
//       handleVerification(email);
//     } else {
//       console.error("Email is undefined");
//     }
//   }, [email, navigate]);

//   return null; // This component doesn't render anything
// }

// const [userId, setUserId] = useState(localStorage.getItem("user_id"));



    function App() {
    
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />


         
            <Route path="create-quiz" element={<Createquiz />} />
            <Route path="csv" element={<Csv />} />
            {/* <Route path="enter-quiz" element={<Enterquiz />} /> */}
            {/* <Route path="free-quiz" element={<Freequiz />} /> */}
            <Route path="textbook" element={<Textbook />} />
            <Route path="quiz-type" element={<Quiztype />} />
            <Route path="pdf" element={<Pdf />} />

            <Route path="contact" element={<Contact />} />
            <Route path="contact1" element={<Contact1 />} />
            <Route path="termsandconditions" element={<Termsandconditions />} />

            
            <Route path="leaderboard" element={<Leaderboard />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quizcreated" element={<Quizcreated />} />
            <Route path="quizresults" element={<Quizresults />} />
            <Route path="quizview_results" element={<Quizresults1 />} />
            <Route path="quizview" element={<Quizview />} />
            <Route path="quizview1" element={<Quizview1 />} />
            <Route path="quizcreated1" element={<Quizcreated1 />} />
            {/* <Route path="/quizaccess/:quizId" element={<QuizAccess />} /> */}
            <Route path="quizcreated2" element={<Quizcreated2 />} />
            <Route path="/quizaccess" element={<QuizAccess />} />

            <Route path="Register" element={<Register />} />
            <Route path="navbar" element={<Navigation />} />
            <Route path="logoutbar" element={<LogoutBar />} />

            <Route path="quiz" element={<Quiz/>} />

            <Route path="free-profile" element={<FreeProfile/>} />
            {/* <Route path="old-password" element={<OldPassword/>} /> */}
            <Route path="configure" element={<Configure/>} />
            <Route path="category" element={<Category/>} />
           
            <Route path="quiz-view" element={<QuizView/>} />
            {/* <Route path="quiz-view" element={<QuizView />} /> */}
            <Route path="leftbar" element={<LeftBar/>} />
            <Route path="navbarhome" element={<Navbarhome/>} />
            <Route path="quiz-results1" element={<Questions/>} />
            <Route path="/quizquestions/:quizId" element={<QuizQuestions/>} />
            <Route path="resendotp" element={<ResendOTP/>} />

            <Route path="resetpassword" element={<Resetpassword/>} />
            <Route path="resetpasswordmobile" element={<Resetpasswordmobile/>} />
            {/* <Route path="create-editquiz" element={<Createeditquiz/>} /> */}

            <Route path="editmanuly" element={<Editmanuly/>} />


            
          </Route>
        </Routes>
        {/* <VerificationHandler /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
