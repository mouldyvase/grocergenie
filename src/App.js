import './App.css';
import { Home } from './Pages/Home';
import { ProductDetails } from './Pages/ProductDetails';
import { Router } from './Routes/Router';

function App() {
  return (
    <>
    <Router/>
   
    </>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from './Component/PrivateRoute';
// import Home from './Pages/Home';
// import Login from './Pages/Login';

// const App = () => {
//   const [isAuthenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     // Implement your authentication logic here
//     // e.g., check if the user is logged in, validate tokens, etc.
//     // Update isAuthenticated accordingly
//     // For demonstration purposes, always set isAuthenticated to false initially
//     setAuthenticated(false);
//   }, []);

//   return (
//     <Router>
//       <Switch>
//         <PrivateRoute
//           path="/home"
//           component={Home}
//           isAuthenticated={isAuthenticated}
//         />
//         <Route path="/login" component={Login} />
//         {/* Add other routes as needed */}
//       </Switch>
//     </Router>
//   );
// };

// export default App;
