import axios from 'axios';

const API_URL = 'http://dummyjson.com/products';

// solicitud get usando fetch
export async function getProductsFetch() {
    const response = await fetch(
        `${API_URL}?limit=30`
    );
    if (!response.ok) {
        throw new Error(
            `Error HTTP: ${response.status}`
        );
    }
    const data = await response.json();
    return data.products;
}

// solicitud get usando axios
export async function getProductsAxios() {
    const response = await axios.get(
        API_URL, {
            params: {
                limit: 30
            }
        }
    );
    return response.data.products;
}

