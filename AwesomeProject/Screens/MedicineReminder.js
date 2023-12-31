import React, { useState ,useContext } from 'react';
import Notifications from '../Notification';
import { UserContext } from '../Hooks/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Keyboard,
  Alert,
  Modal,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

const MedicineReminder = ({navigation,fetchReminders}) => {

  const [showStart,setShowStart]=useState(false);
  const [showEnd,setShowEnd]=useState(false);
  const [showTime,setShowTime]=useState(false);
  const {patientEmail}=useContext(UserContext);

  const [mode,setmode]=useState('date');

  const onChangeStartDate = (event, selectedDate) => {
    setShowStart(false);
    if(event.type==='set' && selectedDate){
    setData((predata)=>({...predata,startDate:selectedDate}))}
    // setShow(false);
  };
  const onChangeEndDate = (event, selectedDate) => {
    setShowEnd(false);
    if(event.type==='set' && selectedDate){
    setData((predata)=>({...predata,endDate:selectedDate}))}
    // setShow(false);
  };
  const onChangeTime = (event, selectedtime) => {
    setShowTime(false);
    if(event.type==='set' && selectedtime){
    setData((predata)=>({...predata,reminderTime:selectedtime}))}
    // setShow(false);
  };
  const showStartMode=(modeToshow)=>{
    console.log('showStartMode called');
        setmode(modeToshow); 
        setShowStart(true);
  }
  const showEndMode=(modeToshow)=>{
    console.log('showEndMode called');
        setmode(modeToshow); 
        setShowEnd(true);
  }
  const showTimeMode=(modeToshow)=>{
    console.log('showEndMode called');
    // console.log(patientId)
        setmode(modeToshow); 
        setShowTime(true);
  }

  const [data,setData]=useState({
    MedicationName:"",
    Type:"",
    dosage:"",
    frequency:"",
    startDate:new Date(),
    endDate:new Date(),
    reminderTime: new Date(),
    patientEmail:patientEmail
    
  })

  const [errorMsg,setError] = useState(null);



  const addMedicine=async()=>{
    if(data.MedicationName==''||data.Type==''){
      setError("All fields are required");
      // console.log(data.Type);
    }
    else{
      console.log(patientEmail)

      try {
        const response = await axios.post(`http://172.20.10.4:8080/patient/addMedicine/${patientEmail}`,data);

        // console.log("here is patient id",patientId)
        if (response.status === 201) {
          // alert(` You have created: ${JSON.stringify(response.data)}`);
          console.log(data)
          console.log("added med")
          Notifications.scheduleNotification({reminder:data.MedicationName})
          fetchReminders();
          setModalVisible(false);
        } else {
          // setError(response.error);
          throw new Error("An error has occurred");
        }
      } catch (error) {
        if (error.response){
          const {data,status}=error.response;
          // setError(`Error ${status}: ${data.mesg}`)
          setError(`${data.mesg}`)
        }
      }
    }
    };


  return (
    
    <SafeAreaView style={styles.container}>
    
       <View style={styles.header}>
       <Image source={require('../Images/medicine-reminder.png')} style={{ width: 180, height: 130,alignSelf:'center',margin:5 }} />
      </View>
      <View style={styles.container3}>
     
       <Text style={styles.label}>Medicine Name:</Text>
       <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(val) => setData({...data,MedicationName:val})}
      />
       <Text style={styles.label}>Medication Form:</Text>
       <View style={styles.formBox1}>
        <TouchableOpacity onPress={()=>setData({...data,Type:"capsule"})} style={styles.formBox}>
        <Image source={require('../Images/cap2.png')} style={{ width: 35, height: 35,alignSelf:'center',margin:5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setData({...data,Type:"tablet"})} style={styles.formBox}>
        <Image source={require('../Images/tablet2.png')} style={{ width: 35, height: 35,alignSelf:'center',margin:5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setData({...data,Type:"syrup"})} style={styles.formBox}>
        <Image source={require('../Images/syrup.png')} style={{ width: 35, height: 35,alignSelf:'center',margin:5 }} />
        </TouchableOpacity>
       </View>
     
       
       <Text style={styles.label}>Dose:</Text>
      <TextInput
        style={styles.input}
        placeholder="Dose"
        onChangeText={(val)=>setData({...data,dosage:val})}
      />

      <Text style={styles.label}>Medication Dose per Intake:</Text>
      <TextInput
        style={styles.input}
        placeholder="Medication per Dose"
        onChangeText={(val)=>setData({...data,frequency:val})}
        />
      
<View style={{flexDirection:"row",justifyContent:"space-between",marginRight:20,}}>
  <View>
<Text style={styles.label}>Start Date:</Text>
<TouchableOpacity onPress={() => showStartMode('date')}>
  <View style={{flexDirection:"column"}}>
   <TextInput 
   style={styles.inputS}
   placeholder='enter a start date'
   value={data.startDate.toLocaleDateString()}
   editable={false}/>
  </View>
</TouchableOpacity>
</View>
{showStart && (
  <DateTimePicker
    value={data.startDate}
    mode={mode}
    is24Hour={true}
    display="spinner"
    onChange={onChangeStartDate}
    minimumDate={new Date()}
    onClose={()=>{setShowStart(false)}}
  />
)}
<View>
<Text style={styles.label}>Set End Date:</Text>
<TouchableOpacity  onPress={() => showEndMode('date')}>
<View style={{flexDirection:"column"}}>
   <TextInput 
   style={styles.inputS}
   placeholder='enter a end date'
   value={data.endDate.toLocaleDateString()}
   editable={false}/>
   </View>
</TouchableOpacity>
</View>
</View>
{showEnd && (
  <DateTimePicker
    value={data.endDate}
    mode={mode}
    is24Hour={false}
    display="spinner"
    onChange={onChangeEndDate}
    minimumDate={new Date()}
    onClose={()=>{setShowEnd(false)}}
  />
)}
<View>
<Text style={styles.label}>Set Time:</Text>
{/* <AntDesign
name="clockcircleo"
size={40}
/> */}
<TouchableOpacity onPress={() => showTimeMode('time')}>
  <View style={styles.dateInputContainer}>
   <TextInput 
   style={styles.input}
   placeholder='enter a time'
   value={data.reminderTime.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', hour12: true })}
   editable={false}/>
  </View>
</TouchableOpacity>
</View>


{showTime && (
  <DateTimePicker
    value={data.reminderTime}
    mode={mode}
    is24Hour={false}
    display="spinner"
    onChange={onChangeTime}
    minimumDate={new Date()}
    onClose={()=>{setShowTime(false)}}
  />
)}

{/* <LinearGradient colors={['#FFAFC6','#FF6C87']}> */}

      <View>
        <TouchableOpacity style={styles.button} onPress={addMedicine}>
        {/* <LinearGradient colors={['#FFAFC6','#FF6C87']}> */}

          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* </LinearGradient> */}
</View>
    
  
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // justifyContent:"center"
    // alignItems:"center"
    // alignContent:"center"
  },
 
  label:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    // color:'#45597A',
    color:'#303032'

  },

  header: {
    // flex:1,
    // backgroundColor: '#F5F5F5',
    // height: 180,
    flexDirection:'row',
    borderWidth:0,
    // paddingTop:10,
    // margin:60,
    // borderBottomLeftRadius:30,
    // borderBottomRightRadius:30,
    // elevation:10,
    justifyContent:"center",
    // borderWidth:1,
  },
  container3:{
    // paddingTop:10,
    // paddingHorizontal:30,
    // paddingVertical:30,
    padding:30,
  },
  // input: {
  //   borderBottomWidth: 1,
  //   borderColor: 'gray',
  //   paddingHorizontal:10,
  //   alignItems:'center',
  //   // borderRadius: 8,
  //   // padding: 8,
  //   // marginBottom: 16,
  // },
  input: {
    height: 40,
    width:250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputS: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding:12,
    // marginHorizontal: 30,
    borderRadius:20,
    width:150,
      height: 40,
      backgroundColor:'#178CCB',
      // shadowColor:'black',
      // elevation:5,
      // marginLeft:40
      alignSelf:"center"
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent:'center',
    alignSelf:'center'
  },
  formBox:{
    borderWidth:1,
    flexDirection:"column",
    height:50,
    width:80,
    // elevation:2,
    borderWidth:0.5,
    borderColor:"#7A7979",
    borderRadius:10,
    marginBottom:15,
    justifyContent:"center"

    
  },
  formBox1:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    borderWidth:0,
    


  }
});
export default MedicineReminder;
