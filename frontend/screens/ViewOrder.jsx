import React from 'react'
import { Link } from 'react-router-dom';


function Vindunu() {
  return (
    <div>
      <h1 style={{marginLeft:500,marginTop:50}}>Order Details</h1>
      <Link to='../orders/add'>
      <button type="button"style={{marginLeft:50,marginTop:30}} class="btn btn-primary">Add Order</button>
      </Link>


      <table style={{marginLeft:50,marginTop:5,width:1400}} class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Brand</th>
      <th scope="col">Price</th>
      <th scope="col">Purchase Date</th>
      <th scope="col">Quantity</th>
      <th scope="col">Expire Date</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   
   
  </tbody>
</table>
    </div>
  )
}

export default Vindunu
