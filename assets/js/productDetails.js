const params = new URLSearchParams(location.search);
const id = params.get('id');

const getProductDetails = async (id) => {
    const {data} = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;
}

const displayProductDetails = async (id) => {
    const image_loader = document.querySelector('.product-image-loader');
    const info_loader = document.querySelector('.product-info-loader');
    const specifications_loader = document.querySelector('.product-specifications-loader');
    const review_loader = document.querySelector('.review-loader');
   
    try{
        const productDetails = await getProductDetails(id);
        
        const discount = Math.trunc(productDetails.discountPercentage);
        const originalPrice = productDetails.price/(1-(discount/100));
        const cleanOriginalPrice = Number(originalPrice.toFixed(2));
        
        //Product Main Images
        document.querySelector(".product-images").innerHTML = `
            <div class="main-image">
                <img
                    src="${productDetails.thumbnail}"
                    alt="${productDetails.title}"
                >
            </div>
            <div class="thumbnail">
                
            </div>
        `
        //Product Thumbnail Images
        document.querySelector(".thumbnail").innerHTML = productDetails.images.map( (img) => {
                    return `<img class="thumbImg"
                        src="${img}"
                        alt="Product thumbnail"
                    >`
                }).join('');

        //Product Information
        document.querySelector(".product-info").innerHTML = `
            <span class="category">${productDetails.category}</span>
        
            <h1>${productDetails.title}</h1>

                    <p class="brand">Brand: <strong>${productDetails.brand? productDetails.brand: "not exist"}</strong></p>

                    <div class="rating">
                        ${productDetails.rating} / 5
                    </div>

                    <div class="price">
                        <span>$${productDetails.price}</span>
                        <del>$${cleanOriginalPrice}</del>
                        <span class="discount">${productDetails.discountPercentage}% OFF</span>
                    </div>

                    <p class="description">
                        ${productDetails.description}
                    </p>

                    <div class="availability">
                        <span class="status">In Stock</span>
                        <span>${productDetails.stock} items available</span>
                    </div>

                    <p class="sku">SKU: ${productDetails.sku}</p>

                    <p class="minimum-order">
                        Minimum Order Quantity: ${productDetails.minimumOrderQuantity}
                    </p>

                    <button class="add-to-cart" type="button">
                        Add to Cart
                    </button>`
        
        //Product Specifications
        document.querySelector(".specifications").innerHTML = `
                <div><strong>Weight:</strong> ${productDetails.weight} g</div>
                <div><strong>Width:</strong> ${productDetails.dimensions.width} cm</div>
                <div><strong>Height:</strong> ${productDetails.dimensions.height} cm</div>
                <div><strong>Depth:</strong> ${productDetails.dimensions.depth} cm</div>
                <div><strong>Warranty:</strong> ${productDetails.warrantyInformation}</div>
                <div><strong>Shipping:</strong> ${productDetails.shippingInformation}</div>
                <div><strong>Return Policy:</strong> ${productDetails.returnPolicy}</div>
                <div><strong>Barcode:</strong> ${productDetails.meta.barcode}</div>
        `
        
        //Prpduct Tags
        document.querySelector(".tags").innerHTML = productDetails.tags.map( (tag) => {
            return `<span>${tag}</span>`
        }).join('');

        //Product Reviews
        document.querySelector(".reviews").innerHTML = productDetails.reviews.map( (review) => {
            const stars = "★".repeat(review.rating);
            return `
                <div class="review">
                    <div class="review-header">
                        <strong>${review.reviewerName}</strong>
                        <span>
                        ${stars}
                        ${review.rating}/5
                        </span>
                    </div>
                    <p>${review.comment}</p>
                </div>
            `
        }).join('');
    }catch(error){
        document.querySelector(".product-images").innerHTML = `<div class="error">Failed to load categories</div>`;
        document.querySelector(".product-info").innerHTML = `<div class="error">Failed to load categories</div>`;
        document.querySelector(".specifications").innerHTML = `<div class="error">Failed to load categories</div>`;
        document.querySelector(".reviews").innerHTML = `<div class="error">Failed to load categories</div>`;
    }finally{
        image_loader.classList.add('hidden');
        info_loader.classList.add('hidden');
        specifications_loader.classList.add('hidden');
        review_loader.classList.add('hidden');
    }
}

displayProductDetails(id);