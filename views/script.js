
const URL = "http://localhost:8080/mint";

let _name = document.querySelector("#name");
let symbol = document.querySelector("#symbol");
let img = document.querySelector("#img");
let address = document.querySelector("#address");
let discription = document.querySelector("#discription");
let myAddress = document.querySelector("#myaddress");
let _list = document.querySelector("#list");
const onSubmit = async () => {
    var data = new FormData()
    data.append('img', img.files[0]);
    data.append('name', _name.value);
    data.append('symbol', symbol.value);
    data.append("address", address.value);
    data.append("discription", discription.value);

    //formdata 내용 확인
    //for (var pair of data.entries()) { console.log(pair[0] + ', ' + pair[1]); }

    await fetch(
        URL, {
        method: 'POST',
        headers: {},
        body: data
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            myAddress.value = address.value;
            let str = "";
            res.forEach(el => {
                str = str + el + "\n";
            })
            _list.value = str;
            return alert("성공적으로 등록 됐습니다.");
        })


}
const button = document.querySelector("#button");
button.addEventListener("click", onSubmit);