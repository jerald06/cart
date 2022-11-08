import React, { Component } from 'react'


export const DataContext = React.createContext();
export class DataProvider extends Component
{
    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes 01",
                "src": "https://images.pexels.com/photos/1307128/pexels-photo-1307128.jpeg?auto=compress&cs=tinysrgb&w=600",
                "description": "welcome to all ",
                "content": "kjhkdhu whdowh oihwdohywod ijdow oiwdo",
                "price": 23,
                "colors": [ "red", "black", "crimson", "teal" ],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Nike Shoes 02",
                "src": "https://media.istockphoto.com/photos/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-picture-id1303978937?b=1&k=20&m=1303978937&s=612x612&w=0&h=oZRMmlID0y_HiVv0Zug4Bf6DUsSNkOAiacUigt0HwJI=",
                "description": "welcome to all ",
                "content": "kjhkdhu whdowh oihwdohywod ijdow oiwdo",
                "price": 19,
                "colors": [ "red", "crimson", "teal" ],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Nike Shoes 03",
                "src": "https://images.pexels.com/photos/60735/pexels-photo-60735.jpeg?auto=compress&cs=tinysrgb&w=600",
                "description": "welcome to all ",
                "content": "kjhkdhu whdowh oihwdohywod ijdow oiwdo",
                "price": 50,
                "colors": [ "lightblue", "white", "crimson", "teal" ],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Nike Shoes 04",
                "src": "https://images.pexels.com/photos/12628402/pexels-photo-12628402.jpeg?auto=compress&cs=tinysrgb&w=600",
                "description": "welcome to all ",
                "content": "kjhkdhu whdowh oihwdohywod ijdow oiwdo",
                "price": 15,
                "colors": [ "orange", "black", "crimson", "teal" ],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Nike Shoes 05",
                "src": "https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&w=600",
                "description": "welcome to all ",
                "content": "kjhkdhu whdowh oihwdohywod ijdow oiwdo",
                "price": 10,
                "colors": [ "orange", "black", "crimson", "teal" ],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Nike Shoes 06",
                "src": "https://images.pexels.com/photos/1456740/pexels-photo-1456740.jpeg?auto=compress&cs=tinysrgb&w=600",
                "description": "welcome to all ",
                "content": "kjhkdhu whdowh oihwdohywod ijdow oiwdo",
                "price": 17,
                "colors": [ "orange", "black", "crimson", "teal" ],
                "count": 1
            },
        ],
        cart: [],
        total: 0
    };
    addCart = ( id ) =>
    {
        const { products, cart } = this.state;
        const check = cart.every( item =>
        {
            return item._id !== id
        } )
        if ( check )
        {
            const data = products.filter( product =>
            {
                return product._id === id
            } )
            this.setState( { cart: [ ...cart, ...data ] } )
        } else
        {
            alert( "The product has been added to cart" )
        }
        const data = products.filter( product =>
        {
            return product._id === id
        } )
        this.setState( { cart: [ ...cart, ...data ] } )
    };
    reduction = id =>
    {
        const { cart } = this.state;
        cart.forEach( item =>
        {
            if ( item._id === id )
            {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        } )
        this.setState( { cart: cart } );
        this.getTotal();
    };

    increase = id =>
    {
        const { cart } = this.state;
        cart.forEach( item =>
        {
            if ( item._id === id )
            {
                item.count += 1;
            }
        } )
        this.setState( { cart: cart } );
        this.getTotal();
    };

    removeProduct = id =>
    {
        if ( window.confirm( "Do you want to delete this product?" ) )
        {
            const { cart } = this.state;
            cart.forEach( ( item, index ) =>
            {
                if ( item._id === id )
                {
                    cart.splice( index, 1 )
                }
            } )
            this.setState( { cart: cart } )
            this.getTotal();
        }
    };
    getTotal = () =>
    {
        const { cart } = this.state;
        const res = cart.reduce( ( prev, item ) =>
        {
            return prev + ( item.price * item.count );
        }, 0 )
        this.setState( { total: res } )
    };
    componentDidUpdate ()
    {
        localStorage.setItem( 'dataCart', JSON.stringify( this.state.cart ) )
        localStorage.setItem( 'dataTotal', JSON.stringify( this.state.total ) )
    }
    componentDidMount ()
    {
        const dataCart = JSON.parse( localStorage.getItem( 'dataCart' ) );
        if ( dataCart !== null )
        {
            this.setState( { cart: dataCart } );
        }
        const dataTotal = JSON.parse( localStorage.getItem( 'dataTotal' ) );
        if ( dataTotal !== null )
        {
            this.setState( { total: dataTotal } );
        }
    }
    render ()
    {
        const { products, cart, total } = this.state;
        const { addCart, reduction, increase, removeProduct, getTotal } = this;
        return (
            <DataContext.Provider value={ { products, addCart, cart, reduction, increase, removeProduct, total, getTotal } }>
                { this.props.children }
            </DataContext.Provider>
        )
    }
}
