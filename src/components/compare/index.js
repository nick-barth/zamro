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
                    {products.map(product => {
                        const { name, Artikelnummer } = product;
                        return (
                            <div key={Artikelnummer} onClick={this.removeProduct(Artikelnummer)} className="compare__select-item">
                                <input type="checkbox" checked={product.display} value={Artikelnummer} />
                                <label className="compare__select__label"> {name} </label>
                            </div>
                        )
                    })}
                </div>
                {displayedProducts.map((product, index) => {
                    const { productImage, salePrice, name, Artikelnummer } = product;
                    return (
                        <div key={Artikelnummer} className={`compare__item ${index == 0 ? 'compare__border-left' : null}`}>
                            <div onClick={this.removeProduct(Artikelnummer)} className="compare__garbage-can">
                                <img className="compare__trash" src="/assets/garbage.svg" alt="remove selection" />
                            </div>
                            <img className="compare__img" src={productImage} alt={name} />
                            <div className="compare__name">
                                {name}
                            </div>
                            <div className="compare__price">
                                {salePrice}
                                <div className="compare__i-cant-speak-dutch">
                                    per stuk / excl. btw
                                </div>
                            </div>
                            <div className="compare__badges">
                                {product.badges.split('|').map(badge => {
                                    return (
                                        <img className="compare__badge" src={badge} alt="badge"/>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            {displayedTraits.map(trait => {
                return (
                    <div className="compare__trait-row">
                        <div className="compare__trait-item">
                            {trait}
                        </div>
                        {displayedProducts.map((product, i) => {
                            const diff = displayedProducts.some(p => {
                                return p[trait] !== product[trait]
                            });
                            return (
                                <div className={`compare__trait-item compare__trait-item--heavy ${diff ? 'compare__trait--diff' : null} ${i === 0 ? 'compare__border-left' : null}`}>
                                    {product[trait]}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
  }
}

export default Compare;
