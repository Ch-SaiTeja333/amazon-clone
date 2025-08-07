import React, { lazy, Suspense } from 'react';
import './App.css'
// import AddToDo from './components/AddToDo'
// import DisplayToDos from './components/DisplayToDos'
import {createBrowserRouter,RouterProvider} from 'react-router';
import { Navigate } from 'react-router';
const AddToDo=lazy(()=>import('./components/AddToDo'));
const DisplayTodos=lazy(()=>import('./components/DisplayToDos'));
const Rootlayout=lazy(()=> import('./components/Rootlayout'));
const Home=lazy(()=>import('./components/Home'));
const ToDosCount=lazy(()=>import('./components/TodosCount'));
function App() {
  const browserObj=createBrowserRouter([{
    path:'/',
    element:<Rootlayout ></Rootlayout>,
    children:[
      {
        path:"",
        element:<Navigate to = 'displaytodos'></Navigate>
      },
      {
        path:'addtodo',
        element:<Suspense fallback={
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }><AddToDo></AddToDo></Suspense>
      },
      {
        path:'displaytodos',
        element:<Suspense fallback={
           <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }><DisplayTodos></DisplayTodos></Suspense>
      },
      {
        path:'todoscount',
        element:<Suspense fallback={
           <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }><ToDosCount></ToDosCount></Suspense>
      }
    ]
  }])
  return (
    <div className='full-body'>
       <RouterProvider router={browserObj} />
    </div>
  )
}

export default App
