// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Card from './Card';
// import Sender from './Sender';
// import Fetch from './Integration/fetch';

// function App() {
//     const [addedItems, setAddedItems] = useState([]); 

//     return (
//         <BrowserRouter>
//         <Fetch/>
//             <nav className="bg-gray-200 p-4">
//                 <Link to="/" className="mr-4">Home</Link>
//                 <Link to="/sender" className="mr-4">Sender</Link>
//             </nav>
//             <Routes>
//                 <Route path="/" element={<Card addedItems={addedItems} setAddedItems={setAddedItems} />} />
//                 <Route path="/sender" element={<Sender addedItems={addedItems} />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;


// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Sender from './Sender';
// import AppProvider from './AppProvider';
// import Footer from './Footer';
// import Login from './Login';
// // import Fetch from './Integration/Fetch';
// import { useState } from 'react';
// import Carousel from './Carousal';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <BrowserRouter>
//       <AppProvider>
//         <Routes>
//           <Route
//             path="/login"
//             element={<Login setIsLoggedIn={setIsLoggedIn} />}
//           />

//           <Route
//             path="/"
//             element={isLoggedIn ? <Carousel/> : <Navigate to="/login" />}
//           />

//           {/* <Route
//             path="/"
//             element={isLoggedIn ? <Fetch /> : <Navigate to="/login" />}
//           /> */}
//           <Route
//             path="/sender"
//             element={isLoggedIn ? <Sender /> : <Navigate to="/login" />}
//           />
//         </Routes>
//         <Footer />
//       </AppProvider>
//     </BrowserRouter>
//   );
// };

// export default App;

import React from "react";
import NewsList from "./NewsList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Fixed import path
import Leave from "./Leave";
import "./App.css"; // Import your CSS file for styling

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <BrowserRouter>
        <nav className="menu">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/Leave" className="menu-item">Leave</Link>
        </nav>

        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/Leave" element={<Leave />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
