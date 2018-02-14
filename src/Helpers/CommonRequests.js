import Request from './Request';

const getCategories = (fn) => {
    Request('/categories', "GET")
    .then((response) => {
        fn(response.data.categories);
    })
    .catch((error)  => {
        console.log(error);
    });
}


export { getCategories };