import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { SignInPage } from './pages/SignInPage';
import { FindARoomPage } from './pages/FindARoomPage';
import { DetailsPage } from './pages/DetailsPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { WriteAReviewPagePage } from './pages/WriteReviewPage';
import { NotFound } from './pages/NotFound';
import { APIProvider } from '@vis.gl/react-google-maps';
import { LandlordRegisterPage } from './pages/LandlordRegisterPage';
import { LandlordDashboard } from './pages/LandloardDashboard';
import { ContactUs } from './pages/ContactUs';
import { createClient } from '@supabase/supabase-js';
import { Root } from './components/auth/Root';
import { ProtectedPage } from './components/auth/ProtectedPage';
import { AuthProvider } from './components/auth/AuthProvider';
import { LandlordHomePage } from './pages/dashboard/landlord/LandlordHomePage';
import { DashboardLayout } from './components/auth/DashboardLayout';
import { useEffect, useState } from 'react';
import { StudentHomePage } from './pages/dashboard/student/StudentHomePage';
import { LandlordSignInPage } from './pages/LandlordSignInPage';
import { LandlordPortalLayout } from './components/auth/LandlordPortalLayout';
import { MyApplicationsPage } from './pages/dashboard/student/MyApplicationsPage';
// import 'bootstrap/dist/css/bootstrap.min.css';
/** NOTE: PLEASE DO NOT MODIFY THIS FILE! */

export const supabase = createClient("https://wtetwimklgtmbokfedam.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZXR3aW1rbGd0bWJva2ZlZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0OTc2ODMsImV4cCI6MjA0NDA3MzY4M30.5i2QS0uDDPxWNiPRcTn8jzUkAKkPVnYSpJDLipLPHDI")

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/auth',
      children: [
        {
          path: 'landlord-register',
          element: <LandlordRegisterPage/>
        },
        {
          path: 'landlord-sign-in',
          element: <LandlordSignInPage/>
        },
        {
          path: 'sign-in',
          element: <SignInPage/>
        },
        {
          path: 'register',
          element: <RegisterPage/>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout/>,
      children:[
        {
          path: 'home',
          element: <StudentHomePage/>
        },
        {
          path: 'my-applications',
          element: <MyApplicationsPage/>
        },
        {
          path: 'settings',
          // element: 
        },

      ]
    },
    {
      path: '/landlord',
      element:  <LandlordPortalLayout/>,
      children: [
        {
          path: 'register',
          element: <LandlordRegisterPage/>
        },
        {
          path: 'dashboard',
          children: [
            {
              path: "home",
              element: <LandlordHomePage/>
            },
            {
              path: 'settings',
              // element: 
            },
          ]
        }
      ]
    },
    // {
    //   path: '/register',
    //   element: <RegisterPage/>
    // },
    {
      path: '/sign-in',
      element: <SignInPage/>
    },
    {
      path: '/find-a-room',
      element: <FindARoomPage/>
    },
    {
      path: '/residence-details/:id',
      element: <DetailsPage/>
    },
    {
      path: '/application/:id',
      element: <ApplicationPage/>
    },
    {
      path: '/reviews',
      element: <ReviewsPage/>
    },
    {
      path: '/write-a-review/:id',
      element: <WriteAReviewPagePage/>
    },
    // {
    //   path: '/landlord/register',
    //   element: <LandlordRegisterPage/>
    // },
    // {
    //   path: '/landlord/dashboard',
    //   element: <LandlordDashboard/>
    // },
    {
      path: '/contact-us',
      element: <ContactUs/>
    },
  ]
)

/** NOTE: PLEASE DO NOT MODIFY THIS FILE!! */

function App() {

  const [session,  setSession] = useState(null)

  // useEffect(()=>{
  //   supabase.auth.getSession().then(({data: {session}}) => {
  //     setSession(session)
  //   })

  //   const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })

  //   return () => subscription.unsubscribe()
  // }, [])

  // if(!session) {
  //   return <Navigate to={'/'} replace/>
  // }

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  );
}

export default App;
