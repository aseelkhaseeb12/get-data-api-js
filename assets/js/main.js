const productsElement = document.querySelector('[data-product]');
 
async function getProduct(){
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;
    console.log(products);
    
    const result = products.map( (product) => {
        const discount = Math.trunc(product.discountPercentage);
        const originalPrice = product.price/(1-(discount/100));
        const cleanOriginalPrice = Number(originalPrice.toFixed(2));

        return `
            <a href="../../product_details.html">
                <div class="product">
                    <div class="relative bg-third rounded-t-3xl">
                        <img src=${product.images[0]} alt=">${product.title}"> 
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
                </div>
            </a>
        `
    }).join('');

    productsElement.innerHTML = result;
}

getProduct();

const categoriesElement = document.querySelector('[data-optionCategory]');

async function getCategory(){
    const response = await axios.get("https://dummyjson.com/products/categories");
    const categories = response.data;
    console.log(response.data);
    
    const categoriesResult = categories.map( (category) => {
        return `
            <div>
                // <h2>Category name : ${category.slug}</h2>
                <option value="${category.slug}">${category.slug}</option>
            <div/>
         `
    }).join('');

    categoriesElement.innerHTML = categoriesResult;
}

getCategory();