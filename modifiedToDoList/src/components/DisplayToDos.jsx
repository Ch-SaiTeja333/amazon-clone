import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react'
import { useTotal } from './store';
import { useNavigate } from 'react-router';


function DisplayToDos() {
  let navigate=useNavigate();
  let {totalCount,setTotalCount}=useTotal();
  let [show,setShow]=useState(false);
  let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm();
  let [users,setUsers]=useState([]);
  // edit user details
  function openForm(obj) {
    // enable form
    setShow(true);
    // in form display the particular user details
    setValue('id',obj.id);
    setValue('username',obj.username);
    setValue('email',obj.email);
    setValue('dob',obj.dob);
    setValue('phnno',obj.phnno);
  }
  async function closeForm(modifiedObj) {
    let res=await fetch(`http://localhost:3000/users/${modifiedObj.id}`,{
      method:'PUT',
      body:JSON.stringify(modifiedObj),
      headers:{
        'Content-Type':'application/json'
      }
    })
    // console.log(res);
    if(res.status === 200) navigate('/displaytodos');
    getUsers();
    setShow(false);
  }
  // get the users data
  async function getUsers(){
    try {
       let res=await fetch('http://localhost:3000/users');
        let data=await res.json();
        setUsers(data);
    }
    catch(err) {
      console.log("error in display todos",err);
    }
  }
  useEffect(()=>{
    getUsers()
  },[]);
  useEffect(() => {
    setTotalCount(users.length);
  }, [users]);
  // delete user
  async function handleDeleteUser(obj) {
     try {
       let res=await fetch(`http://localhost:3000/users/${obj.id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        }
       })
      if(res.status === 200) getUsers();
     }
     catch(err) {
      console.log("Error in Delete User:",err);
     }
  }
  async function editgetUserName(value){
      try {
         let res=await fetch(`http://localhost:3000/users?username=${value}`);
          let data=await res.json();
          return data;
      }
      catch(err) {
        console.log("error in display todos",err);
      }
  }
  async function handleUserName(fieldValue) {
    // console.log(fieldValue);
    let data=await editgetUserName(fieldValue);
    if(data.length ===0 ) return true;
    let currId=getValues('id');
    if(data[0].id === currId) return true;
    return "Invalid UserName already exists";
  }
  return (
    <div>
    {
      !show && 
       <div className='container text-center'>
     <table className='table table-hover table-striped table-bordered table-dark'>
      <thead>
        <tr>
          <th className='text-secondary'>Username</th>
          <th className='text-secondary'>Email</th>
          <th className='text-secondary'>DOB</th>
          <th className='text-secondary'>MobileNumber</th>
          <th className='text-secondary'>Edit</th>
          <th className='text-secondary'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((ele)=> 
            <tr key={ele.id}>
               <td><i>{ele.username}</i></td>
               <td><i>{ele.email}</i></td>
               <td><i>{ele.dob}</i></td>
               <td>{ele.phnno}</td>
               <td><button className='btn border text-warning btn-sm' onClick={()=> openForm(ele)}>✏️</button></td>
               <td><button className='btn border text-danger btn-sm' onClick={()=>handleDeleteUser(ele)}>X</button></td>
            </tr>
          )
        }
      </tbody>
     </table>
       </div>
    }
    {/* // display form */}
    {
      show && 

      <div className='container text-center border rounded-2 w-50'>
        <form onSubmit={handleSubmit(closeForm)}>
        {/* back-button */}
        <button className='btn text-danger float-end ' onClick={()=>setShow(false)}>X</button>
        {/* username */}
        <div className='mt-2'>
          <label htmlFor="username" className="form-label text-info float-start">UserName</label>
          <input type="text" {...register('username',{ required:"UserName is required",
                      minLength:{value:4 , message:"Min Length is 4"},
                      maxLength:{value:10, message:"Max Length is 10"},
                      validate: handleUserName})} id="username" placeholder='Enter UserName'  className='form-control'/>
          {/* displaying errors */}
          {errors.username  && <p className='text-danger'>{errors.username.message}</p>}
        </div>
        {/* email */}
        <div className='mt-2'>
         <label htmlFor="email" className="form-label text-info float-start">Email</label>
         <input type="email" id='email' {...register('email',{required:true})} className="form-control" placeholder='Enter Email' />
         {errors.email?.type==='required' && <p className='text-danger'>Email is required</p>}
        </div>
        {/* date-of-birth */}
        <div className='mt-2'>
         <label htmlFor="dob" className="form-label text-info float-start">Date Of Birth</label>
         <input type="date" id='dob'{...register('dob',{required:"DOB is Required",validate:(value)=>{
              let enteredDate=new Date(value)
              let currDate=new Date();
              if(enteredDate.getTime() <= currDate.getTime() ) return true;
              else return ('Invalid DOB')
            }})} className="form-control" placeholder='Enter Date Of Birth' />
        {errors.dob && <p className='text-danger'>{errors.dob.message}</p>}
        </div>
        {/* phone number */}
        <div className='mt-2'>
          <label htmlFor="phnno" className="form-label text-info float-start">Mobile Number</label>
          <input type="text" className="form-control" id='phnno' {...register('phnno',{required:"Mobile Number is Required",validate:(fieldValue)=>{
            const exp=/^[6-9]\d{9}$/
            if(exp.test(fieldValue)) return true;
            else return "Invalid Mobile Number";
          }
          })} placeholder='Enter Mobile Number' />
          {errors.phnno && <p className='text-danger'>{errors.phnno.message}</p>}
        </div>
        {/* submit button */}
        <div className='m-2'>
            <button className='btn btn-success mt-2' type='submit'>Submit</button>
        </div>
      </form>
      </div>
    }
    </div>
  )
}


export default DisplayToDos

  
  // unique user names
