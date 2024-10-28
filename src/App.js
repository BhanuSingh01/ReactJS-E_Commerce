
import { useEffect, useState } from 'react';
import './App.css';
import Category from './Category';
import axios from 'axios';

function App() {

  let [finalCategory , setFinalCategory] = useState([]);
  let [finalProduct, setFinalProduct] = useState([])
  let [categoryName, setCategoryName] = useState ('')

  let getCategory=()=>{
    axios.get('https://dummyjson.com/products/category-list')
    .then((res)=>res.data)
    .then((finalRes)=>{
      setFinalCategory(finalRes);
    })
  }

  let getProducts=()=>{
    axios.get('https://dummyjson.com/products')
    .then((productRes)=>productRes.data)
    .then((finalRes)=>{
      setFinalProduct(finalRes.products);
      // console.log(finalRes.products)
    })
  }

  useEffect(()=>{
    getCategory();
    getProducts();
    // console.log(finalCategory);
  },[])

  useEffect(()=>{
    if(categoryName!==""){
      axios.get(`https://dummyjson.com/products/category/${categoryName}`)
      .then((productRes)=>productRes.data)
      .then((finalRes)=>{
        setFinalProduct(finalRes.products);
      })
    }
  }, [categoryName])


  let pItems = finalProduct.map((products,index)=>{
    return(
      <ProductItems key={index} pdata={products}/>
    )
  })

  return (
    <>
      <div className='py-[40px]'>
        <div className='max-w-[90%] mx-auto'>
          <h1 className='text-center text-[40px] font-bold mb-[30px]'>Our Products</h1> 
          <div className='grid grid-cols-[30%_auto] gap-[20px]'>
            <div >
              <Category finalCategory={finalCategory} setCategoryName={setCategoryName} />
            </div>


            <div>
              <div className='grid grid-cols-3 gap-5'>
                {finalProduct.length >=1 ? pItems : 'No product found!'}
              </div>
            </div>
          </div>   
        </div> 
      </div>
    </>
  );
}


function ProductItems({pdata}){
  // console.log(pdata)
  return (
    
    <div className='shadow-lg text-center pb-3'>
      <img src={pdata.images} className='w-[100%] h-[220px]'/>
      <h4>{pdata.title}</h4>
      <p>{pdata.price}</p>
    </div>
  )
};

export default App;


