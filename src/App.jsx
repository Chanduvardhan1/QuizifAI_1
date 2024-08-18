import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from '../src/Authcontext/AuthContext.jsx';
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
import Classes from './configure/classes.jsx';
import Subjects from './configure/subjects.jsx';
import Specialisations from './configure/specialisations.jsx';
import Course from './configure/course.jsx';
import Contactus from './ContactUs1/contactus.jsx';
import HeaderSection from './HeaderSection/HeaderSection.jsx';

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
      <AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NoPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<PrivateRoute><Contact /></PrivateRoute>} />

        <Route path="create-quiz" element={<PrivateRoute><Createquiz /></PrivateRoute>} />
        <Route path="csv" element={<PrivateRoute><Csv /></PrivateRoute>} />
        <Route path="textbook" element={<PrivateRoute><Textbook /></PrivateRoute>} />
        <Route path="quiz-type" element={<PrivateRoute><Quiztype /></PrivateRoute>} />
        <Route path="pdf" element={<PrivateRoute><Pdf /></PrivateRoute>} />

        <Route path="contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="contact1" element={<PrivateRoute><Contact1 /></PrivateRoute>} />
        <Route path="termsandconditions" element={<Termsandconditions />} />
        <Route path="contactus" element={<Contactus />} />

    <Route path="history" element={<PrivateRoute> <History /></PrivateRoute>} />
    <Route path="course" element={<PrivateRoute> <Course /></PrivateRoute>} />
    <Route path="specialisations" element={<PrivateRoute> <Specialisations /></PrivateRoute>} />
    <Route path="classes" element={<PrivateRoute> <Classes /></PrivateRoute>} />
    <Route path="subjects" element={<PrivateRoute> <Subjects /></PrivateRoute>} />
    <Route path='headersection' element={<HeaderSection/>}/>

        <Route path="leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="quizcreated" element={<PrivateRoute><Quizcreated /></PrivateRoute>} />
        <Route path="quizresults" element={<PrivateRoute><Quizresults /></PrivateRoute>} />
        <Route path="quizview_results" element={<PrivateRoute><Quizresults1 /></PrivateRoute>} />
        <Route path="quizview" element={<PrivateRoute><Quizview /></PrivateRoute>} />
        <Route path="quizview1" element={<PrivateRoute><Quizview1 /></PrivateRoute>} />
        <Route path="quizcreated1" element={<PrivateRoute><Quizcreated1 /></PrivateRoute>} />
        <Route path="quizcreated2" element={<PrivateRoute><Quizcreated2 /></PrivateRoute>} />
        <Route path="/quizaccess" element={<PrivateRoute><QuizAccess /></PrivateRoute>} />

        <Route path="register" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="navbar" element={<PrivateRoute><Navigation /></PrivateRoute>} />
        <Route path="logoutbar" element={<PrivateRoute><LogoutBar /> </PrivateRoute>}/>

        <Route path="quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />

        <Route path="free-profile" element={<PrivateRoute><FreeProfile /></PrivateRoute>} />
        <Route path="configure" element={<PrivateRoute><Configure /></PrivateRoute>} />
        <Route path="category" element={<PrivateRoute><Category /></PrivateRoute>} />

        <Route path="quiz-view" element={<PrivateRoute><QuizView /></PrivateRoute>} />
        <Route path="leftbar" element={<PrivateRoute><LeftBar /></PrivateRoute>} />
        <Route path="navbarhome" element={<Navbarhome />} />
        <Route path="quiz-results1" element={<PrivateRoute><Questions /></PrivateRoute>} />
        <Route path="/quizquestions/:quizId" element={<PrivateRoute><QuizQuestions /></PrivateRoute>} />
        <Route path="resendotp" element={<ResendOTP />} />

        <Route path="resetpassword" element={<Resetpassword />} />
        <Route path="resetpasswordmobile" element={<Resetpasswordmobile />} />
        <Route path="editmanuly" element={<PrivateRoute><Editmanuly /></PrivateRoute>} />
      </Route>
    </Routes>
    {/* <VerificationHandler /> */}
  </BrowserRouter>
</AuthProvider>

    </>
  );
}

export default App;
