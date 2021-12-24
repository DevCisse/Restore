import { useEffect } from "react";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";
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


    
  //const [products, setProducts] = useState<Product[]>([]);

  const products  = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {productsLoaded,status} = useAppSelector(state => state.catalog)
  
  
 
  useEffect(() => {
   if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded,dispatch])


  if(status.includes("pending")) return <LoadingComponent />
    

    return (

        <>
            <ProductList products={products} />
        </>

    )
}