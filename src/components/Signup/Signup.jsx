import { Card, Button, Form} from "react-bootstrap";
import { useRef, useState } from "react"; 
import { useAuth } from "../../contexts/AuthConfig"; 
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [msg, setMsg] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setMsg("Passwords do not match!");
        }

        try{
            setLoading(true);
            setMsg("");
            await signup(emailRef.current.value, passwordRef.current.value);
        } 
        catch{
            setMsg("Failed to create account, please try again later");
            return setLoading(false);
        }
        
        navigate("/");
    }

    return (
        <>  
            {/* {JSON.stringify(currentUser.email)} just to test if a user is created or not*/}
            <Card style = {{width: "50%", marginTop: "3rem"}}>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
                    <Form>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref = {emailRef} required/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref = {passwordRef} required/>
                        </Form.Group>
                        <Form.Group id = "password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type = "password" ref = {passwordConfirmRef} required/>
                        </Form.Group>
                        <div className = "w-100 mt-2 mb-2 text-center" style = {{ height: "20px", color: "red" }}>{msg}</div>
                        <Button disabled = {loading} className = "w-100 mt-2" type = "submit" onClick = {(e) => {handleSubmit(e)}}>Sign Up</Button>
                    </Form>
                </Card.Body>    
            </Card>  

            <div className = "w-100 text-center mt-2">
                Already have an account? <Link to = "/login">Login</Link>
            </div>
        </>
    )
}

export default Signup
