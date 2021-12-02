import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

// interface Props{
//     products : Product[];
//     addProduct? : () => void;

// }

// export default function Catalog({products,addProduct}:Props) {
//     return (

//         <>
//             <h1>Catalog</h1>

//             <ul>
//                 {products.map((product ) => (
//                     <li key={product.id}> {product.name}  - {product.price} </li>
//                 ))}
//             </ul>

//             <button onClick={addProduct}> Add</button>
//         </>





//     )
// }

export default function Catalog() {


    
  const [products, setProducts] = useState<Product[]>([]);
  
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("https://localhost:5001/api/products")
    //   .then(response => response.json())
    //   .then(data => setProducts(data))

    agent.Catalog.list()
    .then((response) =>setProducts(response) )
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, [])


  if(loading) return <LoadingComponent />
    

    return (

        <>
            <ProductList products={products} />
        </>

    )
}