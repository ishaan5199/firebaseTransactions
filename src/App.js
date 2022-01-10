import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthConfig";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Container className = "d-flex align-items-center justify-content-center" style = {{minHeight : "100vh"}}>
			<div className = "w-100 d-flex flex-column justify-content-center align-items-center">
				<Router>
					<AuthProvider>
						<Routes>
							<Route path = "/" element = {<PrivateRoute><Dashboard /></PrivateRoute>}/>
							<Route path = "/signup" element = {<Signup />}/>
							<Route path = "/login" element = {<Login />}/>
						</Routes>
					</AuthProvider>	
				</Router>
			</div>
    	</Container>	
  );
}

export default App;
