import React, { useState } from 'react';
import axios from 'axios';

interface ProductsValidate {

  code: number;
  name: string;
  salesPrice: string;
  costPrice: number;
  newPrice: number;
  isValidCost: boolean;
  isValidPrice: boolean;
  isValidPack: boolean;
  isFound: boolean;
}

type ProductTableProps = {
  products: ProductsValidate[];
};
type Product = {
  code: number;
  name: string;
  salesPrice: number;
};

type ProductUpdateFormProps = {
  product: Product;
};

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {

  return (
    <div >
      <section>
        <p>* "Valid Cost" : Preço atende demanda do financeiro, novo preço presente no fomulario é maior do quê o seu custo.</p>
        <p>* "Valid Price": Preço atende demanda do Marketing, novo preço presente no formulario
          está dentro do ajuste de preço maximo ou minimo em até <b>10%</b>. </p>
        <p>* "Valid Price": Preço do kit/pack foi atualizado com novo preço do produto.
          Para <b>UM</b> único produto nos demais itens na tabela  <i>sempre será válido</i>. </p>
      </section>

      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cost Price</th>
            <th>Sales Price</th>
            <th>New Price</th>
            <th>Found</th>
            <th>Valid Cost</th>
            <th>Valid Price</th>
            <th>Valid Kit</th>
          </tr>
        </thead>
        <tbody>

          {products.map(product => (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.costPrice}</td>
              <td>{product.salesPrice}</td>
              <td>{product.newPrice}</td>
              <td>{product.isFound ? "Found" : "NOT EXIST"}</td>
              <td>{product.isValidCost ? "Valid" : "NOT VALID"}</td>
              <td>{product.isValidPrice ? "Valid" : "NOT VALID"}</td>
              <td>{product.isValidPack ? "Valid/One" : "NOT VALID"}</td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

const FileSender: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string>('');
  const [products, setProducts] = useState<ProductsValidate[]>([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => setFileData(reader.result as string);
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      debugger
      const response = await axios.post('http://localhost:3000/products/validateForm', { fileData });
      const res = response.data?.data;
      setProducts(res);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fileInput">Select a file:</label>
        <input type="file" id="fileInput" onChange={handleFileChange} />
      </div>
      <button type="submit" disabled={!fileData}>Submit</button>


      <ProductTable products={products} />
    </form>
  );
}
export default FileSender;