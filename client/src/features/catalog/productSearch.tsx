import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./CatalogSlice";

export default function ProductSearch()
{
    const {productsParams} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
    const [searchTerm,setSearchTerm] = useState(productsParams.searchTerm);

    const debouncedSearch = debounce((event:any) =>{
        dispatch(setProductParams({searchTerm:event.target.value}))
    },1000)
    return (
        <TextField
        label='Search Products'
        variant='outlined'
        fullWidth
        value={searchTerm || ''}
        onChange={(event:any) =>{
            setSearchTerm(event.target.value);
            debouncedSearch(event);
        }}

      />
    )
}