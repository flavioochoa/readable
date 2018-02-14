import React from 'react';


const Breadcrumb = ({data}) => {
    let l = data.length - 1;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">
                    {
                        data.map((item, index) => {
                            if (l === index) {
                                return item.label;
                            }
                            return <a key={index} href={ item.href }>{ item.label } > </a> 
                        })
                    }
                </h2>
            </div>
        );
}

export default Breadcrumb;