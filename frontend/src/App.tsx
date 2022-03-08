import React, {FormEvent, useEffect, useState} from "react";
import {createProduct, getProducts, updateProduct} from "./productsApiClient";
import {Box, Checkbox, Container} from "@mui/material";
import {Product} from "./product";

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [updateId, setUpdateId] = useState<number>(0);
    const [checked, setChecked] = useState(false);
    const [defaultselect, setDefaultSelect] = useState(0);

    const setProductNameFromInput = (event: FormEvent<HTMLInputElement>) => {
        setProductName(event.currentTarget.value);
    };

    const setQuanityFromInput = (event: FormEvent<HTMLInputElement>) => {
        setQuantity(event.currentTarget.valueAsNumber);
    };

    const submitForm = (event: FormEvent) => {
        event.preventDefault();

        createProduct(productName, quantity).then(() => {
            getProducts().then(data=>setProducts([...data]));
        });
        setQuantity(0);
        setProductName("");
    };



    useEffect(() => {
        getProducts().then(data=>setProducts([...data]));
    }, []);

    const increaseProductInventory = (event: React.ChangeEvent<HTMLSelectElement> , id:number) =>  {
        updateProduct(quantity, id).then(() => {
            getProducts().then(data=>setProducts([...data]))
        });
        setQuantity(0);
        setProductName("");


    }
    const decreaseProductInventory = (event: React.ChangeEvent<HTMLSelectElement> ,id:number) =>  {
        updateProduct(-quantity, id).then(() => {
            getProducts().then(data=>setProducts(data))});

        setQuantity(0);
        setProductName("");

    }

    function handleCheck(event: React.ChangeEvent<HTMLInputElement>,idToUpdate: number){


        setChecked(event.target.checked);
        if(checked==false){
            setUpdateId(idToUpdate)
        }
        else {setUpdateId(0)}

    }


    return (
        <Container sx={{mx: 1, my: 1}}>
            <h1>Parts Unlimited Inventory</h1>
            <Box display='flex' flexDirection='row'>
                <Box>
                    <h2>Product</h2>
                    {products.map((product, index) => (
                        <div key={index}>{product.name} </div>

                    ))}
                </Box>
                <Box display={"flex"} flexDirection='col'>
                    <form onSubmit={submitForm}>
                        <br/>
                        <label>
                            Product to add
                            <input name="product" type="text" value={productName} required onChange={setProductNameFromInput}/>
                        </label>

                        <br/>
                        <label>
                            Quantity
                            <input name="quantity" value={quantity} type="number"  required onChange={setQuanityFromInput}/>
                        </label>
                        <Box>
                            <select aria-label="increase inventory" value={defaultselect} onChange={(event)=>{increaseProductInventory(event,parseInt(event.target.value));
                           }}>
                                <option>Increase inventory</option>
                                {products.map((product, index) => (
                                    <option key={index} value={product.id}> {product.name } </option>

                                ))}
                            </select>
                        </Box>
                        <Box>
                            <select value={defaultselect} onChange={(event)=>{decreaseProductInventory(event,parseInt(event.target.value));
                               }}>
                                <option>Decrease inventory</option>
                                {products.map((product, index) => (
                                    <option key={index} value={product.id}> {product.name } </option>

                                ))}
                            </select>
                        </Box>     <button type="submit">Submit</button>
                    </form>

                </Box>
                <Box>
                    <h2>Quantity</h2>
                    {products.map((product, index) => (
                        <div key={index}>{product.quantity } <button name={product.name}>
                        Update inventory</div>
                    ))}
                </Box>



            </Box>
        </Container>
    );
}

export default App;
