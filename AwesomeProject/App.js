/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


// import React, { useState, useEffect,useContext } from 'react';
// import notifee from '@notifee/react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FrontScreen from "./src/FrontScreen"
// import MedicineReminder from './Screens/MedicineReminder'
// import SignInScreen from './Screens/SignInScreen';
// import Home from './Screens/Home';
// import Profile from './Screens/Profile'
// import SignUpScreen from './Screens/SignUpScreen';
// import Appointments from './Screens/Appointment';
// import DoctorOverview from './Screens/BookAppointView';
// import ReminderHome from './Screens/ReminderHome';
// import Prescription from './Screens/Prescription'
// import ViewPrescriptions from './Screens/ViewPrescriptions';
// import DoctorFeedback from './Screens/DoctorFeedback';
// import Complaint from './Screens/Complaint';
// import MedicineHome from './Screens/MedicineHome';
// import Some from './Screens/Some';
// import Notification from "./Notification";
// import { AuthProvider } from './Hooks/AuthContext';
// import DoctorHomeScreen from './DoctorScreen/DoctorHomeScreen'
// import DoctorPrescription from './DoctorScreen/DoctorPrescription'
// import Feedback from './DoctorScreen/Feedback'
// import MyAppointments from './Screens/MyAppointments'
// import PatientsReports from './DoctorScreen/PatientsReports'
// import DrawerNav from './src/DrawerNav';
// import ViewReports from './Screens/ViewReports'
// import OnBoarding from './src/OnBoarding'
// import SplashScreen from 'react-native-splash-screen';
// import PatientHomeScreen from './Screens/PatientHomeScreen'
// import DoctorProfile from './DoctorScreen/DoctorProfile'
// import DoctorComplaint from './DoctorScreen/DoctorComplaint'
// import { UserContext } from './Hooks/AuthContext';
// import DoctorNavigator from './src/DoctorNavigator'



// const Stack = createNativeStackNavigator();

// function App() {
// const {doctorName } = useContext(UserContext);

// useEffect(() => {
//   SplashScreen.hide()
// }, [])

//   const StackScreen=()=>{
//     return(
//     <Stack.Navigator screenOptions={{ headerShown: false }}> 
//     <Stack.Screen name="OnBoarding" component={OnBoarding} />
//     <Stack.Screen name="FrontScreen" component={FrontScreen} />
//     <Stack.Screen name="SignIn" component={SignInScreen} />
//     <Stack.Screen name="SignUp" component={SignUpScreen}/>
//     </Stack.Navigator> 
// )
//   }
//   return (
//     <AuthProvider>
//       <NavigationContainer >

{/* <Stack.Navigator screenOptions={{ headerShown: false }}>         */ }
{/* <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="FrontScreen" component={FrontScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />

          <Stack.Screen name="SignUp" component={SignUpScreen}/> */}
{/* <Stack.Screen name="PatientHomeScreen" component={PatientHomeScreen}/> */ }
{/* <Stack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} /> */ }

{/* <Stack.Screen name="Some" component={Some} /> */ }
{/* <Stack.Screen name="DoctorPrescription" component={DoctorPrescription} /> */ }
{/* <Stack.Screen name="MyAppointments" component={MyAppointments} /> */ }
{/* <Stack.Screen name="Appointments" component={Appointments} /> */ }
{/* <Stack.Screen name="ViewReports" component={ViewReports} /> */ }

{/* <Stack.Screen name="MedicineReminder" component={MedicineReminder} /> */ }
{/* <Stack.Screen name="MedicineHome" component={MedicineHome} /> */ }
{/* <Stack.Screen name="Feedback" component={Feedback} /> */ }
{/* <Stack.Screen name="PatientsReports" component={PatientsReports} /> */ }

{/* <Stack.Screen name="DoctorOverview" component={DoctorOverview} /> */ }
{/* <Stack.Screen name="Profile" component={Profile} /> */ }
{/* <Stack.Screen name='Prescription' component={Prescription} /> */ }
{/* <Stack.Screen name='ViewPrescriptions' component={ViewPrescriptions} /> */ }
{/* <Stack.Screen name='DoctorFeedback' component={DoctorFeedback} /> */ }
{/* <Stack.Screen name='Complaint' component={Complaint} /> */ }
{/* <Stack.Screen name='DoctorProfile' component={DoctorProfile} /> */ }

{/* </Stack.Navigator> */ }
{/* <DrawerNav/> */ }
{/* <DoctorNavigator />  */ }
//       </NavigationContainer>
//     </AuthProvider>
//   );


// }
// export default App;
import React, { useContext, useEffect } from 'react';
import { AuthProvider } from './Hooks/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserContext } from './Hooks/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import OnBoarding from './src/OnBoarding';
import FrontScreen from './src/FrontScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import DoctorNavigator from './src/DoctorNavigator'; // Import your DoctorNavigator
import PatientNavigator from './src/PatientNavigator';
import PatientHomeScreen from './Screens/PatientHomeScreen';
import DoctorHomeScreen from './DoctorScreen/DoctorHomeScreen';
// Import your PatientNavigator
const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="FrontScreen" component={FrontScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />


          {/* Use a Screen to wrap the DoctorNavigator */}
          {/* {UserRole === 'doctor' ? (
            <Stack.Screen name="DoctorHomeScreen" options={{ headerShown: false }}>
              {() => <DoctorNavigator />}
            </Stack.Screen>
          ) : <Stack.Screen name="PatientHomeScreen" options={{ headerShown: false }}>
          {() => <PatientNavigator />}
        </Stack.Screen>} */}

          <Stack.Screen name="DoctorNavigator" component={DoctorNavigator } />

          <Stack.Screen name="PatientNavigator" component={PatientNavigator} />

        </Stack.Navigator>

      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;




