import React,{useState,useEffect} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const AddCustomer=()=>{

	const history=useHistory();
	const [name,setName]=useState("");
	const [address,setAddress]=useState("");
	const [num,setNum]=useState("");
	const [email,setEmail]=useState("");
	//const [comp,setComp] = useState("");

	const [carray,setCarray]=useState([]);

    useEffect(()=>{
    	fetch("/allCustomer")
    	.then(res=>res.json())
	    .then(result=>{
	    	setCarray(result);
	    })
	    return ()=>{};
	},[]);

    const postCustomer=()=>{
		var avail = false;
			carray.map((cus) => {
			if(cus.name==name && cus.number==num && cus.address==address) avail = true;
		})
		if(avail) alert("Customer Data already available");
		else{
	      fetch("/addCustomer",{
	      method:"post",
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify({
	        name,
	        address,
	        num,
	        email
			// comp
	      })
	    }).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/viewCustomer");
	      }
	    })
	  }
	}

	  // const reset=()=>{
	  // 	setName("");
	  // 	setAddress("");
	  // 	setNum("");
	  // 	setEmail("");
	  // }

	  const cancel=()=>{
		history.push("/");
	  }
	  const store = () => {
		//   setComp(name+num)
		  postCustomer();

	  }

	return (
		<div className="hbg" >
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addCustomer" className="btn1" style={{passing:"5px"}}>Add Customer</Link>
				          <Link to="viewCustomer" style={{passing:"5px"}}>View Customer</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Add Customer Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Customer Name:</td>
					            <td><input type="text" placeholder="Customer Name" value={name} onChange={(e)=>setName(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Address:</td>
					            <td><input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Phone Number:</td>
					            <td><input type="number" placeholder="Phone Name" value={num} onChange={(e)=>setNum(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Email:</td>
					            <td><input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          <Link to="#" className="btn" style={{backgroundColor:"#e60000"}} onClick={()=>cancel()}>Cancel</Link>
				          {/*<Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>*/}
				          <Link to="#" className="btn" onClick={()=>store()}>Add</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default AddCustomer; 