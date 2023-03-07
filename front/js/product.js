const params = new URL(document.location).searchParams;
const id  = params.get("id");
const url = `http://localhost:3000/api/products/${_id}`;


const getElement = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getElement();
