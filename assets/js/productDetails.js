const params = new URLSearchParams(location.search);
const id = params.get('id');

const getProductDetails = async (id) => {
    const {data} = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;
}

const displayProductDetails = async (id) => {
    const products_loader = document.querySelector('.products-loader');
   
    try{
        const productDetails = await getProductDetails(id);
        
        const discount = Math.trunc(productDetails.discountPercentage);
        const originalPrice = productDetails.price/(1-(discount/100));
        const cleanOriginalPrice = Number(originalPrice.toFixed(2));
        
        //Product Main Images
        document.querySelector("[data-product-images]").innerHTML = `
            <!-- Main image -->
            <div class="h-118.5 rounded-3xl p-6 border border-secondary bg-white shadow-fourth">
                <img class="h-full w-full object-contain rounded-[14px]" src="${productDetails.thumbnail}" alt="${productDetails.title}">
            </div>
            <!-- Thumbnail images -->
            <div data-thumbnail class="flex flex-row gap-2.5">
                
            </div>
        `
        //Product Thumbnail Images
        document.querySelector("[data-thumbnail]").innerHTML = productDetails.images.map( (img) => {
                    return `
                    <div class="w-25 rounded-[14px] p-1 bg-white border-2 border-secondary">
                        <img class="rounded-lg" src="${img}" alt="Product thumbnail">
                    </div>`
                }).join('');
        
        //Product Information
         document.querySelector("[data-product-info]").innerHTML = `
            <!-- Category -->
            <span class="text-[14px] leading-5.25 tracking-[0.5px] font-bold uppercase text-sixth">${productDetails.category} . ${productDetails.brand}</span>
            <!-- Product Name -->
            <h1 class="text-[32px] leading-9.5 font-semibold text-fifth">${productDetails.title}</h1>
            <!-- Rate -->
            <div class="flex flex-row gap-1.5 text-[14px] leading-5.25 font-normal text-fourth">
                <span class="text-tenth">★</span>
                ${productDetails.rating} · 
                <span class="text-[14px] leading-5.25 font-normal text-fourth">${productDetails.reviews.length} verified customer reviews</span>
            </div>   
            <!-- Price -->
            <div>
                <span class="text-[28px] leading-10.5 font-semibold text-sixth">$${productDetails.price}</span>
                <span class="text-[16px] leading-6 font-normal text-fourth line-through">$${cleanOriginalPrice}</span>
                <span class="rounded-full py-0.75 px-2.5 bg-eighth text-[12px] leading-4.5 font-bold text-sixth">-${discount}% OFF</span>
            </div>
            <!-- Description -->
            <p class="text-[15px] leading-6 font-normal text-fifth">${productDetails.description}</p>
            <!-- Tags -->
            <div data-tags class="flex flex-row gap-2">

            </div>
            `
            //Tags
            document.querySelector("[data-tags]").innerHTML = productDetails.tags.map((tag) => {
                return `
                <span class="rounded-full px-2.5 py-0.75 bg-seventh text-[12px] leading-4.5 font-bold text-sixth">
                    ${tag}
                </span>`
            }).join('');
            
            //specifications
            //Availability
            document.querySelector("[data-inStock]").innerHTML = `(${productDetails.stock} available)`;
            //Minimum Order Quantity
            document.querySelector("[minimum-order]").innerHTML = `${productDetails.minimumOrderQuantity} item`;
            //Shipping
            document.querySelector("[data-ships]").innerHTML = `${productDetails.shippingInformation}`;
            //Return Policy
            document.querySelector("[data-return-policy]").innerHTML = `${productDetails.returnPolicy}`;
            //Warranty
            document.querySelector("[data-warranty]").innerHTML = `${productDetails.warrantyInformation}`;
            //Weight 
            document.querySelector("[data-weight]").innerHTML = `${productDetails.weight} g`;
            //Width Hight Depsth 
            document.querySelector("[data-whd]").innerHTML = `${productDetails.dimensions.width} x ${productDetails.dimensions.height} x ${productDetails.dimensions.depth} cm`;
            //SKU
            document.querySelector("[data-sku]").innerHTML = `${productDetails.sku}`;

        //Product Reviews
        document.querySelector("[data-review]").innerHTML = productDetails.reviews.map( (review) => {
            const stars = "★".repeat(review.rating);
            return `
            <article class="flex flex-col rounded-2xl p-4 gap-1.5 border border-secondary bg-white">
                <div>
                    <span class="text-[15px] leading-5.5 font-bold text-fifth">${review.reviewerName}</span>
                    <span class="text-fourth"><span class="text-tenth">${stars}</span> ${review.rating}/5</span>
                </div>
                <p class="text-[15px] leading-5.5 font-normal text-fifth">${review.comment}</p>
            </article>
            `
        }).join('');
    }catch(error){
        document.querySelector("[data-product-info]").innerHTML = `<div class="error">Failed to load product</div>`;
    }finally{
        products_loader.classList.add('hidden');
    }
}

displayProductDetails(id);