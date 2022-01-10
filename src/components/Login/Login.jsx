import { Card, Button, Form } from "react-bootstrap";
import { useRef, useState } from "react"; 
import { useAuth } from "../../contexts/AuthConfig"; 
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [msg, setMsg] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            setMsg("");
            await login(emailRef.current.value, passwordRef.current.value);
        } 
        catch{
            setMsg("Invalid email or password!");
            return setLoading(false);
        }
        
        navigate("/");
    }

    return (
        <>  
            <Card style = {{width: "50%", marginTop: "3rem"}}> 
                <Card.Body>
                    <h2 className = "text-center mb-4">Login</h2>
                    <Form>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref = {emailRef} required/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref = {passwordRef} required/>
                        </Form.Group>
                        <div className = "w-100 mt-2 mb-2 text-center" style = {{ height: "20px", color: "red" }}>{msg}</div>
                        <Button disabled = {loading} className = "w-100 mt-2" type = "submit" onClick = {(e) => {handleSubmit(e)}}>Login</Button>
                    </Form>
                </Card.Body>    
            </Card>  

            <div className = "w-100 text-center mt-2">
                Don't have an account? <Link to = "/signup">Signup</Link> 
            </div>
        </>
    )
}

export default Login
