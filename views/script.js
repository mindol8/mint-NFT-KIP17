
const URL = "http://localhost:8080/mint";

let _name = document.querySelector("#name");
let symbol = document.querySelector("#symbol");
let img = document.querySelector("#img");
let address = document.querySelector("#address");
let discription = document.querySelector("#discription");

const onSubmit = async () => {
    await fetch(
        URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: _name.value,
            symbol: symbol.value,
            img: img,
            address: address.value,
            discription: discription.value
        })

    })
        .then(res => {
            alert(res);
        })
        .catch(err => {
            alert(err);
        })

}
const button = document.querySelector("#button");
button.addEventListener("click", onSubmit);