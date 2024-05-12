export const getProducts = async() => {
    const response = await fetch("https://fakestoreapi.com/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const productsapi = await response.json();
      return productsapi
}