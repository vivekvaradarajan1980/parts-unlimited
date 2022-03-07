import axios from "axios";
import {Product} from "./product";

export async function updateProduct(quantity: number, id: number) : Promise<Product>{



  axios.patch<Product>("/products"+"/"+id, {id:"",quantity:quantity, name:""},  {headers: {"Content-Type": "application/json" }})
      .then((data)=>{return data})
      .catch(err=>alert(err.response.data));

}


export async function createProduct(product: string, quantity: number): Promise<Product> {

  const productToAdd={name:product,quantity:quantity}

  return (await axios.post<Product>("/products", productToAdd, {headers:{"Content-Type" : "application/json"}})).data
}

export async function getProducts(): Promise<Product[]> {
  return (await axios.get<Product[]>("/products")).data
}
