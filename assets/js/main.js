const getCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/categories");
    return response;
}

const displayCategories = async () => {
    const loader = document.querySelector('.categories-loader');
    
    try{
        const {data} = await getCategories();
        const categoriesResult = data.map( (category) => {
            return `
                <li class="cursor-pointer bg-secondary rounded-2xl p-2.5 mb-3 text-[13px] leading-4.5 font-semibold text-fifth hover:bg-sixth hover:text-white">
                    <button type="button">${category.name}</button>
                <li/>
            `
        }).join('');

        document.querySelector('[data-optionCategory]').innerHTML = categoriesResult;
    }catch(error){
        document.querySelector('[data-optionCategory]').innerHTML = `<li class="error">Failed to load categories<li/>`;
    }finally{
        loader.classList.add('hidden');
    }
}
displayCategories();

const getProducts = async() => {
    const response = await axios.get("https://dummyjson.com/products");
    return response;
}

const displayProducts = async () => {
    const loader = document.querySelector('.products-loader');
    try{
        const {data} = await getProducts();
        
        const result = data.products.map( (product) => {
        const discount = Math.trunc(product.discountPercentage);
        const originalPrice = product.price/(1-(discount/100));
        const cleanOriginalPrice = Number(originalPrice.toFixed(2));

        return `
                <div class="product" data-product-id="${product.id}">
                    <div class="relative bg-third rounded-t-3xl">
                        <img src=${product.thumbnail} alt=">${product.title}"> 
                        <span class="absolute top-2.5 left-2.5 rounded-full py-0.75 px-2.25 bg-sixth text-[12px] leading-4.5 font-bold text-white">-${discount}%</span>
                    </div>
                    <div class="p-4">
                        <span class="product_category_name">${product.category}</span>
                        <h3 class="product_name">${product.title}</h3>
                        <div class="pt-7.5 gap-2">
                            <span class="product_price">$${product.price}</span>
                            <span class="product_originalPrice">$${cleanOriginalPrice}</span>
                        </div>
                    </div>
                    
                    <a class="m-4 text-center text-white bg-sixth rounded-lg" href="./product_details.html?id=${product.id}" data-action="view-details">
                        View Details
                    </a>
                </div>
            `
        }).join('');

        document.querySelector('[data-product]').innerHTML = result;
    }catch(error){
        document.querySelector('[data-product]').innerHTML = `<div class="error">Failed to load categories</div>`;
    }finally{
        loader.classList.add('hidden');
    }
}

displayProducts();