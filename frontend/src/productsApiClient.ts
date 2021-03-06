import axios from "axios";
import {Product} from "./product";



export async function updateProduct(quantity: number, id: number) : Promise<Product>{


  const productToAdd={name:"",quantity:quantity,id:""}

  return (await axios.patch<Product>("/products/"+id, productToAdd, {headers:{'Access-Control-Allow-Credentials':"true","Content-Type" : "application/json",  'Access-Control-Allow-Origin' : '*'}})).data
  //axios.patch<Product>("/products"+"/"+id, {id:"",quantity:quantity, name:""},  {headers: {"Content-Type": "application/json" }})
    //  .then((data)=>{return data})
      //.catch(err=>alert(err.response.data));

}


export async function createProduct(product: string, quantity: number): Promise<Product> {

  const productToAdd={name:product,quantity:quantity}

  return (await axios.post<Product>("http://localhost:8080/products", productToAdd, {headers:{'Access-Control-Allow-Credentials':"true","Content-Type" : "application/json", 'Access-Control-Allow-Origin' : '*'}},)).data
}

export async function getProducts(): Promise<Product[]> {
  return (await axios.get<Product[]>("http://localhost:8080/products",{headers:{'Access-Control-Allow-Credentials':"true","Content-Type" : "application/json", 'Access-Control-Allow-Origin' : '*'}})).data
}
