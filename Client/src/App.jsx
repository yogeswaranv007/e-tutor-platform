
// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import Navbar from "./components/common/Navbar";
// import AppRoutes from "./router/AppRoutes";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//       <Navbar />
//       <div className="main-content">
//         <AppRoutes />
//       </div>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;






import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./router/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
          <Navbar />
          <main>
            <AppRoutes />
          </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
