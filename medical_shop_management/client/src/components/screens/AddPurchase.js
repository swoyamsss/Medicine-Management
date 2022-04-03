import React,{useEffect, useState} from 'react';
import '../../App.css';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';


const AddPurchase=()=>{

	const history=useHistory();
	const [pname,setPname]=useState("");
	const [cname,setCname]=useState("");
	const [num,setNum]=useState("");
	const [price,setPrice]=useState("");
	const [quantity,setQuantity]=useState("");

	// const [code,setCode]=useState("");
	// const [mname,setMname]=useState("");
	// const [dname,setDname]=useState("");
	// const [price1,setPrice1]=useState("");
	// const [stock,setStock]=useState("");
	// const [description,setDescription]=useState("");
    

	const [carray,setCarray]=useState([]);

    useEffect(()=>{
    	fetch("/allCustomer")
    	.then(res=>res.json())
	    .then(result=>{
	    	setCarray(result);
	    })
	    return ()=>{};
	},[]);
	const [marray,setMarray]=useState([]);

    useEffect(()=>{
    	fetch("/allMedicine")
    	.then(res=>res.json())
	    .then(result=>{
	    	setMarray(result);
	    })
	    return ()=>{};
	},[]);

	function wait(ms){
		var start = new Date().getTime();
		var end = start;
		while(end < start + ms) {
		  end = new Date().getTime();
	   }
	 }
    const postPurchase=()=>{
		  var avail = false;
		  var id;
		  var x;
		  carray.map((cus) => {
			  if(cus.name==cname && cus.number==num) avail = true;
		  })
		  if(!avail){
			  alert("Add the Customer data to database First");
			  history.push("/addCustomer")
		  }
		  else{
		  var check_med = false;
		  var check_stock = false;
		  marray.map((med) =>{
			  if(med.mname==pname){
				  check_med = true;
				  if(med.stock >= quantity){
					  id = med._id
					  check_stock = true;
					  x = med.stock - quantity
				  }
			  }
		  })
		  if(!check_med) alert("The Product is not available in the shop");
		  else if(!check_stock) alert("The Product is not available in the required quantity");
		  else if(check_med && check_stock){
	      fetch("/addPurchase",{
	      method:"post",
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify({
	        pname,
	        cname,
	        num,
	        price,
	        quantity
	      })
	    }).then(res=>res.json())
	    .then(data=>{
	      if(data.error){
	        M.toast({html: data.error,classes:"#c62828 red darken-3"})
	      }
	      else{
	        M.toast({html: data.message,classes:"#43a047 green darken-1"})
	        history.push("/updateMedicine/"+id);
			alert("update stock to"+ x)
	      }
	    })
		
	  }
	}
	}

	  // const reset=()=>{
	  // 	setPname("");
	  // 	setCname("");
	  // 	setNum("");
	  // 	setPrice("");
	  // 	setQuantity("");
	  // }

	  const cancel=()=>{
		history.push("/");
	  }



	return (
		<div className="hbg">
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			        	<div className="hh">
				          <Link to="addPurchase" className="btn1" style={{passing:"5px"}}>Add Purchase</Link>
				          <Link to="viewPurchase" style={{passing:"5px"}}>View Purchase</Link>
				        </div>
			    </div>
		    </div>
			<div class="row">
			    <div class="col s12 m8 offset-m2 l8 offset-l2">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <div class="card-title">Add Purchase Details</div>
			            <table>
					        <tbody>
					          <tr>
					            <td>Product Name:</td>
					            <td><input type="text" placeholder="Product Name" value={pname} onChange={(e)=>setPname(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Customer Name:</td>
					            <td><input type="text" placeholder="Customer Name" value={cname} onChange={(e)=>setCname(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Phone Number:</td>
					            <td><input type="number" placeholder="Phone Number" value={num} onChange={(e)=>setNum(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Price (Rupees):</td>
					            <td><input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/></td>
					          </tr>
					          <tr>
					            <td>Quantity:</td>
					            <td><input type="number" placeholder="Quanity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/></td>
					          </tr>
					        </tbody>
				        </table>
				        <div class="card-action">
				          <Link to="#" className="btn" style={{backgroundColor:"#e60000"}} onClick={()=>cancel()}>Cancel</Link>
				          {/*<Link to="#" className="btn" onClick={()=>reset()}>Reset</Link>*/}
				          <Link to="#" className="btn" onClick={()=>postPurchase()}>Add</Link>
				        </div>
			        </div>
			      </div>
			    </div>
		    </div>
		</div>
	);
}

export default AddPurchase; 