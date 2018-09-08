import React, { Component } from 'react';

import './style.css';

class Compare extends Component {

  constructor(props) {
    super(props)

    this.state = {
        products: props.products
    }

  }

  removeProduct (id) {
      const productId = id;
      return () => {
          const { products } = this.state;
          const newProducts = products.map(p => {
              return {
                ...p,
                display: p.Artikelnummer === productId ? !p.display : p.display
              }
          });
          console.log
          this.setState({
              products: newProducts
          });
      }
  }

  render() {
    const { products } = this.state;
    const displayedProducts = products.filter(p => p.display === true);
    const displayedTraits = products[0] ? Object.keys(products[0]).filter(key => {
        const noDisplay = ['salePrice', 'badges', 'stepQuantity', 'manufacturerName', 'grossPrice', 'BUP_UOM', 'BUP_Value', 'uom', 'productImage','BUP_Conversion', 'minQuantity', 'manufacturerImage', 'name', 'sku', 'listPrice', 'channel', 'display','atp'];
        return !noDisplay.includes(key)
    }).sort() : null;

    return (
        <div className="compare">
            <div className="compare__title">
                {displayedProducts.length} displayed products
            </div>
            <div className="compare__container">
                <div className="compare__select">
                    {displayedProducts.map(product => {
                        const { name, Artikelnummer } = product;
                        return (
                            <div className="compare__select-item">
                                <input type="checkbox" checked={product.display} value={Artikelnummer} onChange={(id) => this.toggleSelection(id)} />
                                <label className="compare__select__label"> {name} </label>
                            </div>
                        )
                    })}
                </div>
                <div className="compare__traits">
                    {displayedTraits.map(item => {
                        return (
                            <div className="compare__traits-item">
                                {item}
                            </div>
                        );
                    })}
                </div>
                {displayedProducts.map(product => {
                    const { productImage, salePrice, name, Artikelnummer } = product;
                    return (
                        <div key={Artikelnummer} className="compare__item">
                            <div onClick={this.removeProduct(Artikelnummer)} className="compare__garbage-can">
                                <img className="compare__trash" src="/assets/garbage.svg" alt="remove selection" />
                            </div>
                            <img className="compare__img" src={productImage} alt={name} />
                            <div className="compare__name">
                                {name}
                            </div>
                            <div className="compare__price">
                                {salePrice}
                            </div>
                            {displayedTraits.map(item => {
                                const diff = displayedProducts.some(p => {
                                    return p[item] !== product[item]
                                });
                                return (
                                    <div className={`compare__traits-item ${diff ? 'compare__traits-item--diff' : ''}`}>
                                        {product[item]}
                                    </div>
                                );
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
  }
}

export default Compare;
