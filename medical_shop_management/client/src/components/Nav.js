import React,{useContext,useRef,useEffect,useState} from 'react';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App';


const Nav=()=>{

	const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    
	document.addEventListener('DOMContentLoaded', function() {
		let options=null;
	    var elems = document.querySelectorAll('.sidenav');
	    var instances = M.Sidenav.init(elems, options);
	});

	document.addEventListener('DOMContentLoaded', function() {
		let options=null;
	    var elems = document.querySelectorAll('.dropdown-trigger');
	    var instances = M.Dropdown.init(elems, options);
    });


	const renderList = ()=>{
       if(state){
           return [
            <li><Link to="/addDealer" style={{color:"black",fontWeight:"bold"}}>Dealer</Link></li>,
	        <li><Link to="/addMedicine" style={{color:"black",fontWeight:"bold"}}>Medicine</Link></li>,
	        //<li><Link to="/addEmployee" style={{color:"black",fontWeight:"bold"}}>Employee</Link></li>,
	        <li><Link to="/addCustomer" style={{color:"black",fontWeight:"bold"}}>Customer</Link></li>,
	        <li><Link to="/addPurchase" style={{color:"black",fontWeight:"bold"}}>Purchase Information</Link></li>,
            <li>
             <button className="btn #c62828 red darken-3 lgt" style={{fontWeight:"bold"}}
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>   
           ]
       }else{
         return [
          <li><Link to="/signin" style={{color:"black",fontWeight:"bold"}}>Login</Link></li>
         ]
       }
     }


	return (
		<div class="navbar-fixed">
			<nav>
			    <div class="nav-wrapper">
			      <Link to="/" className="brand-logo" style={{left:"50px",top:"0px",fontWeight:"bold"}}><span style={{color:"white"}}>ePHARMA</span></Link>
			      <Link to="#" data-target="mobile-demo" class="sidenav-trigger" style={{float:"right",color:"black"}}><i class="material-icons">menu</i></Link>
			      <ul class="right hide-on-med-and-down">
			        {renderList()}
			      </ul>
			    </div>
			</nav>
			  <ul class="sidenav" id="mobile-demo">
			  	{renderList()}
			  </ul>
		</div>
	);
}

export default Nav;