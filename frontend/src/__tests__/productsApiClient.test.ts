import nock from 'nock';
import {createProduct, getProducts,updateProduct} from "../productsApiClient";

describe('productsApiClient', () => {
    describe('getProducts', () => {
        it('should make a GET request to retrieve all products', async () => {
            const expectedProducts = [{name: 'first-product', quantity: 0}, {name: 'second-product', quantity: 2}];
            nock('http://localhost').get('/products').reply(200, expectedProducts);

            const actualProducts = await getProducts();

            expect(actualProducts).toEqual(expectedProducts);
        });
    });

    describe('createProduct', () => {
        it('should make a POST request to create a product', async () => {
            const scope = nock('http://localhost', {
                reqheaders: {
                    'Content-Type': 'application/json'
                }
            })
                .post('/products', {name: "my-new-product", quantity: 0})
                .reply(200, {name: "my-new-product", quantity: 0});

            const response = await createProduct("my-new-product",0);

            expect(scope.isDone()).toEqual(true);
            expect(response.name).toEqual("my-new-product");
            expect(response.quantity).toEqual(0);
        });

        it('should make a PATCH request to update a product', async () =>{
            const scopes = nock('http://localhost', {reqheaders: {'Content-Type': 'application/json'}})
                .patch('/products/1',{id:"",name:"", quantity: 2})
                .reply(204,{id:"",name:"first-product", quantity: 2});

            const response = await updateProduct(2,1);

            expect(scopes.isDone()).toEqual(true);
            expect(response.name).toEqual("first-product");
            expect(response.quantity).toEqual(2);
        })
    });

});