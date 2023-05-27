import React from "react";
import '../../Css/front.scss';

const Front =() =>{
    return(
       <>
<div className="about-section">
  <h1>What we do?</h1>
  <p>Our website is dedicated to sharing travel experiences with others who share my passion for adventure and exploration<br/>
     Through our blogs, we aim to provide a platform for fellow travelers to connect,  <br/>
     learn from each other, 
     and discover new destinations and cultures.</p>
 
</div>

<h2 style={{textAlign:"center"}}>Our Team</h2>
<div className="row">
  <div className="column">
    <div className="card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTufK5D9wtRSZXkoc_FzOQ3cqqE097YkW0zwBa-1okMYlO4lB2RmlO6wBYy9XxsxdF_c4M&usqp=CAU" alt="Jane" style={{width:"100%" }}/>
      <div className="container">
        <h2>Karan Khode</h2>
       
        <p>khode.k@northeastern.edu</p>
     
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://cdn2.vectorstock.com/i/1000x1000/31/56/young-man-vector-553156.jpg" alt="Mike" style={{width:"100%" }}/>
      <div className="container">
        <h2>Shubham Dongale</h2>
        
        <p>dongale.s@northeastern.edu</p>
        
      </div>
    </div>
  </div>
  
  <div className="column">
    <div className="card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8oSiGw2_kqZq8WXYul1gKbY_THpDh7RqEc6WOpXHMQo-Uy0GmhjoG-sjNFw2T5lwhwNE&usqp=CAU" alt="John" style={{width:"100%"}} />
      <div className="container">
        <h2>Sai dutt</h2>
        
        <p>dutt.s@northeastern.edu</p>
      
      </div>
    </div>
  </div>
  <div className="column">
    <div className="card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rLm0T8LtCjKsNtb0hH37lHcujDuWJ9otXtbyUWO9ZBb8b9SPPgWlnBUW4iOzvOCppGg&usqp=CAU" alt="John" style={{width:"100%"}} />
      <div className="container">
        <h2>Makarand Zende</h2>
        
        <p>zende.m@northeastern.edu</p>
       
      </div>
    </div>
  </div>
</div>

</>
    )
}

export default Front;