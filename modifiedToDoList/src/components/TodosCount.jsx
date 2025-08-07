import React from 'react'
// import {ans} from './DisplayToDos';
import { useTotal } from './store';
function TodosCount() {
  let {totalCount,setTotalCount}=useTotal();
  return (
    <div className='text-white border text-center w-50 mx-auto rounded-2'>
     <h1 className='text-danger'>Users Count</h1>
     <h1>{totalCount}</h1>
    </div>
  )
}

export default TodosCount
