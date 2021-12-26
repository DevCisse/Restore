import {  Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckBoxButtons from "../../app/components/CheckButtons";
import RadioButtongroup from "../../app/components/RadioButtonGroup";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./CatalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./productSearch";

const sortOptions = [
  { value: 'name', label: 'AlphabeticalOrder' },
  { value: 'priceDesc', label: 'Price - High to low  ' },
  { value: 'price', label: 'Price - Low to high ' },
]

export default function Catalog() {



  //const [products, setProducts] = useState<Product[]>([]);

  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();

  const { productsLoaded, filtersLoaded, brands, types,productsParams,metaData } = useAppSelector(state => state.catalog)



  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());

  }, [productsLoaded, dispatch, filtersLoaded])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded])


  //we do not have the metadata

  if (!filtersLoaded) return <LoadingComponent />


  return (



    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
         <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>

          <RadioButtongroup 
          selectedValue={productsParams.orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setProductParams({orderBy:e.target.value}))} />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
         <CheckBoxButtons 
         items={brands}
         checked={productsParams.brands}
         onChange={(items:string[]) =>dispatch(setProductParams({brands:items}))}
         />
        </Paper>


        <Paper sx={{ mb: 2, p: 2 }}>
        <CheckBoxButtons 
         items={types}
         checked={productsParams.types}
         onChange={(items:string[]) =>dispatch(setProductParams({types:items}))}
         />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9} sx={{mb:2}}> 
      {metaData &&
      <AppPagination  metaData={metaData}  onPageChange={(page:number) => dispatch(setPageNumber ({pageNumber:page}))} />
      }
      

      </Grid>
    </Grid>

  )
}