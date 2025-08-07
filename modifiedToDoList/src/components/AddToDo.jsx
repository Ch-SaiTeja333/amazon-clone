import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
function AddToDo() {
  const {register,handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate();
  async function submitForm(obj) {
    let res=await fetch('http://localhost:3000/users',{
      method:'POST',
      body:JSON.stringify(obj),
      headers:{
        'Content-type':'application/json'
      }
    })
      // console.log(res);
    if(res.status===201) navigate('/displaytodos')
  }
  // get the user details
 
  return (
    <div className='container p-2 m-1 w-50 mx-auto border rounded-3 text-center'>
     <div className='d-flex justify-content-between align-item-center '>
      <h1 className='text-white'>add-new-user</h1>
         <button className='text-danger back-button' onClick={()=>navigate('/displaytodos')} >X</button>
     </div>
     <form onSubmit={handleSubmit(submitForm)}>
        {/* username */}
        <div className='mt-2'>
          <label htmlFor="username" className="form-label text-info float-start">UserName</label>
          <input type="text" {...register('username',{ required:"UserName is required",
                                                       minLength:{ value:4 ,message:"Min length is 4"},
                                                       maxLength:{ value:10 , message:"Max Length is 10"},
                                                       validate: handleUserName})}
           id="username" placeholder='Enter UserName'  className='form-control'/>
          {/* displaying errors */}
          {errors.username && <p className='text-danger'>{errors.username.message}</p>}
          {/* {errors.username?.type==='required' && <p className='text-danger'>UserName is required</p>}
          {errors.username?.type==='minLength' && <p className='text-danger'>Min length is 4</p>}
          {errors.username?.type==='maxLength' && <p className='text-danger'>Max Length is 10</p>} */}
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
          <input type="date" id='dob' {...register('dob',{required:"DOB is Required",validate:(value)=>{
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
          <input type="text" className="form-control" id='phnno' {...register('phnno',{required:"Mobile Number is Required", validate:(fieldValue)=>{
            const exp=/^[6-9]\d{9}$/;
            if(exp.test(fieldValue)) return true;
            else return "Invalid Mobile Number";
          }})} placeholder='Enter Mobile Number' />
          {errors.phnno && <p className='text-danger'>{errors.phnno.message}</p>}
        </div>
        {/* submit button */}
        <div>
            <button className='btn btn-success mt-2' type='submit'>Submit</button>
        </div>
     </form>
    </div>
  )
}

export default AddToDo

  async function getUsers(value){
      try {
         let res=await fetch(`http://localhost:3000/users?username=${value}`);
          let data=await res.json();
          return data;
      }
      catch(err) {
        console.log("error in display todos",err);
      }
  }
  
  // unique user names
  async function handleUserName(fieldValue) {
    // console.log(fieldValue);
    let data=await getUsers(fieldValue);
    if(data.length !==0 ) return "UserName already exists";
    else return true;
  }