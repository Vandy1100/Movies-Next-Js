import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Layout from "../../../components/layout";
function list({results}) {

const [product,setProduct]= useState([])

const columns=[
  {
  name:"Id",
  selector : row=>row.id
},
{
  name:"Products Name",
  selector : row=>row.title
},
{
  name:"Price",
  selector : row=>row.price
},
{
  name:"Category",
  selector : row=>row.category.name
},
{
  name:"Image",
  selector : row=><img src={row.category.image} style={{width:'100px'}}/>
},
{
  name:"Action",
  selector : row=>
  <div>
  <button className="btn btn-primary m-2">Edit</button>
  <button className="btn btn-danger">Delete</button>
  </div>
}
]
function handleFilter(event){
  const newData= results.filter(row=>{
    return row.title.toLowerCase().includes(event.target.value.toLowerCase())
  })
    setProduct(newData)
}
useEffect(()=>{
  setProduct(results)
},[])

  return (
    <Layout>
    <div className="w-25 float-end mb-2">
              <input onChange={handleFilter}
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="find products here"
              />
            </div>
    <DataTable  columns={columns} data={product} pagination />
    </Layout>
  );
}
export async function getServerSideProps(){
  const resp= await fetch("https://api.escuelajs.co/api/v1/products")
  const results = await resp.json()
  console.log(results)
          return{
             props:{
            results
           }
          }
            }
export default list;
