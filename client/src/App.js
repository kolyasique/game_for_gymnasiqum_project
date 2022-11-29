import { useContext } from 'react';
// import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import { GlobalContext } from './context/Global.context';
import UserContextProvider, { UserContext } from './context/User.context';

// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const { loading } = useContext(GlobalContext);
  const { user } = useContext(UserContext);

  return (
    loading ? (
      <div className="spinner-container">
        <img className="spinner" src="https://i.yapx.ru/GuFC4.gif" alt="spinner" />
      </div>
    )
      : (
        <div>

          <Header />
          <UserContextProvider>
            {console.log(user, 'Это юзер в аппе2222')}
            {
                user
                  ? (

                    <Home />

                  ) : (<Auth />)
}
          </UserContextProvider>
        </div>

      )
  );
}

export default App;

//   return (

//     <div className="App">
//       <Header auth={auth} setAuth={setAuth} />

//       <Routes>

//         <Route element={<ProtectedRoute auth={!auth} redirectPath="/" />}>
//           <Route path="/auth" element={<Auth setAuth={setAuth} />} />
//         </Route>

//         <Route element={<ProtectedRoute auth={auth} redirectPath="/auth" />}>
//           <Route path="/" element={<Home todo={todo} setTodo={setTodo} />}>
//             {/* <Todolist /> */}
//           </Route>
//         </Route>

//       </Routes>

//     </div>

//   );
// }

// export default App;
