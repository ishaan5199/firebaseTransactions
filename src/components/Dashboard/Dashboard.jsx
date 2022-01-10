import { useState, useRef } from "react";
import { Form, Card, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthConfig';
import { db } from '../../firebase';
import { parse } from "papaparse";

const Dashboard = () => {

    const [msg, setMsg] = useState("");
    const [xacts, setXacts] = useState([]);
    const [check, setCheck] = useState([]);
    const [aggregates, setAggregates] = useState(null);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const fileRef = useRef();
    var [acts, setActs] = useState([]);

    const handleFileSubmit = async (e) => {
        setMsg("");
        setAggregates(null);
        acts = [];
        setCheck([]);
        e.preventDefault();

        /* converting FileList to array */
        const transactions = Array.from(fileRef.current.files);
        
        /* getting text content out of the array */
        const text = await transactions[0].text();
        /* converting to an array of objects */
        var parsedText = parse(text, { header: true }).data;
        parsedText = parsedText.filter((xact) => {
            return xact.Date !== "";
        });
        setXacts(parsedText);

    }

    const handleAction = (act, index) => {

        const checks = [...check];
        act ? checks[index] = "accepted" : checks[index] = "rejected";
        setCheck(checks);

        const rewardCalc = (amount, act) => {
            return act ? (0.1) * amount : 0;
        }

        var tempActs = acts;
        tempActs[index] = {
            uid: currentUser.uid,
            date: xacts[index].Date,
            xactId: xacts[index]["Transaction ID"],
            amount: parseInt(xacts[index].Amount),
            isApproved: act,
            reward: rewardCalc(xacts[index].Amount, act),
            netAmount: xacts[index].Amount - rewardCalc(xacts[index].Amount, act)
        };
        setActs(tempActs);
    }

    /* adding to the database */
    const handleSubmit = () => {
        if (acts.length !== xacts.length){
            return setMsg("Please select an action for all the transactions");
        }

        acts.forEach((act) => {
            db.collection("transactions").add(act).catch(() => {
                return setMsg("Failed to upload to Database");
            });
        });

        setMsg("Data added to Database!");

        generateSummary();
    }   

    const generateSummary = () => {
        var totalXacts = 0, totalXactsReward = 0, totalAmount = 0, totalReward = 0, totalNet = 0;
        
        /* unsubscribing from the query statement */
        const unsubscribe = db.collection("transactions").where("uid", "==", currentUser.uid)
        .get()
        .then((querySnap) => {
            querySnap.forEach((doc) => {
                totalXacts += 1;
                totalXactsReward += doc.data().isApproved ? 1 : 0;
                totalAmount += doc.data().amount;
                totalReward += doc.data().reward;
                totalNet += doc.data().netAmount;
            });

            setAggregates({
                totalXacts: totalXacts,
                totalXactsReward: totalXactsReward,
                totalAmount: totalAmount,
                totalReward: totalReward,
                totalNet: totalNet
            });

            setXacts([]);
        })
        .catch(() => {
            return setMsg("Couldn't create transaction summary");
        })
    }

    const handleLogOut = async () => {
        setMsg("");

        try{
            await logout();
        }  
        catch{
            return setMsg("Failed to logout");
        }

        navigate("/login");

    }

    return (
        <>
            <Card style = {{width: "50%", marginTop: "3rem"}}>
                <Card.Body>
                    <h2 className = "text-center mb-4">Account</h2>
                    <p className = "text-center"><strong>Email : </strong>{currentUser.email}</p>
                    <Form>
                        <Form.Group id = "file">
                            <Form.Label>Xact File (only .csv file)</Form.Label>
                            <Form.Control type = "file" ref = {fileRef} required accept = "text/csv"/>
                        </Form.Group>
                        <Button type = "submit" className = "w-100 mt-4" onClick={(e) => {handleFileSubmit(e)}}>Add</Button>
                    </Form>
                    <div className = "text-center mt-2">
                        <Button variant = "link" onClick = {handleLogOut}>Logout</Button> 
                    </div> 
                </Card.Body>
            </Card>
            
            <div className = "text-center mt-5" style = {{ width: "60%" }}>
                {
                    xacts.length === 0 ? "" :
                    <>
                        <strong>Transactions</strong><br></br><br></br>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>ID</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {xacts.map((xact, index) => { return (
                                    <tr key = {index}>
                                        <td>{xact["Transaction ID"]}({check[index]})</td>
                                        <td>{xact.Amount}</td>
                                        <td>{xact.Date}</td>
                                        <td className = "d-flex flex-column justify-content-center">
                                            <Button variant = "success" style = {{ marginBottom: "1rem" }} onClick = {() => {handleAction(true, index)}}>Approve</Button>
                                            <Button variant = "danger" style = {{ marginBottom: "1rem" }} onClick = {() => {handleAction(false, index)}}>Reject</Button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                        <div className = "w-100 mt-1 mb-1 text-center" style = {{ height: "20px", color: "red" }}>{msg}</div>
                        <Button variant = "success" style = {{ marginTop: "1rem", marginBottom: "2rem"}} onClick = {handleSubmit}>Apply Changes</Button>
                    </>
                }
            </div> 
            
            {aggregates ? 
                <Card style = {{width: "60%", marginBottom: "1rem"}}>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead className = "text-center">
                                <tr>
                                    <th>Aggregate functions</th>
                                    <th>Values(no. may be higher, if the user has prev transactions)</th>
                                </tr>
                            </thead>
                            <tbody className = "text-center">
                                <tr><td>Total Transactions</td><td>{aggregates.totalXacts}</td></tr>
                                <tr><td>Total Transactions with Reward</td><td>{aggregates.totalXactsReward}</td></tr>
                                <tr><td>Total Amount</td><td>{(aggregates.totalAmount).toFixed(2)}</td></tr>
                                <tr><td>Total Reward</td><td>{(aggregates.totalReward).toFixed(2)}</td></tr>
                                <tr><td>Total Net Amount</td><td>{(aggregates.totalNet).toFixed(2)}</td></tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            :
            ""    
            }
            
        </>
    )
}

export default Dashboard