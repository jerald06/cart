import React from 'react'
import Products from './section/Products'
import Details from './section/Details'
import {  Route, Routes } from 'react-router-dom'
//import { Box } from '@mui/material'
import Cart from './section/Cart'
import Payment from './section/Payment'
function Section()

{


    
        return (


            <section>
    
                <Routes>
                    <Route path='/' exact element={ <Products/> }  />
                    <Route path='/product' exact element={ <Products/> }  />
                    <Route path='/product/:id' exact element={ <Details/> } />
                    <Route path='/cart' exact element={ <Cart/> } />
                    <Route path='/payment' exact element={ <Payment/> } />
                   
                    </Routes>
            </section>

        )
    }


export default Section
