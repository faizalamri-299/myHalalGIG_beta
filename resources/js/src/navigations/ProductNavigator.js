import React from 'react'
import {Switch,Route,useRouteMatch} from "react-router-dom";
import ProductList from '../screens/product/ProductList';
import ProductDetails from '../screens/product/ProductDetails';
import {ProductContext, getProduct, getSupplier,getRawMaterial } from '../screens/product/Product';



const ProductNavigator = () => {
  
    let { path } = useRouteMatch();
    const [product, setProduct] = React.useState(null);
    const [supplier, setSupplier] = React.useState(null);
    const [rawmatDB, setRawMaterial] = React.useState(null);

    
    React.useEffect(() => {

      const bootstrapAsync = async () => {
        getProduct().then(x => {
          setProduct(x);
        })
      };

      getSupplier().then(x => {
        const ddl =  x.map((x,i) =>
        ({
          key: x.id,
          text: x.sp_name,
          value: x.id,
        }))
        setSupplier(ddl);
      });

      getRawMaterial().then(x => {
        const ddl2 =  x.map((x,i) =>
        ({
          key: x.id,
          text: x.supplierwithrawmat,
          value: x.id,
        }))
        setRawMaterial(ddl2);
      });
  
      bootstrapAsync();
  
    }, []);

  const productContext = React.useMemo(
    () =>({product,supplier,rawmatDB}),
    [product,supplier,rawmatDB]
);
  return (
    <ProductContext.Provider value={productContext}>
        <Switch>
            <Route exact path={path}>
                <ProductList />
            </Route>
            <Route path={`${path}/details/:index`}>
                <ProductDetails />
            </Route>
        </Switch>
    </ProductContext.Provider>
  )
}

export default ProductNavigator