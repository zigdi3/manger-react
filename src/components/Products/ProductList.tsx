import React, { useEffect, useState } from "react";
import axios from 'axios';

interface Product {
  code: number;
  name: string;
  sales_price: string;
  cost_price: number;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {

    const { data } = await axios.get("http://localhost:3000/products")

    setProducts(data.data);
  };

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Cost</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.sales_price}</td>
              <td>{product.cost_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
