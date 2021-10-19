let adminLogin = document.getElementsByClassName("loginAdmin")[0];
adminLogin.innerHTML = localStorage.getItem("adminLogin");













// let qwe = new XMLHttpRequest();
//     qwe.open("post", document.URL + "/admins", true);
//     qwe.setRequestHeader(
//             'Content-Type',
//             'application/json'
//         )
//     let tyu = JSON.stringify({
//         a: "abc",
//         b: "bca"
//     })
//     qwe.send(tyu);
//     qwe.onload = () => {console.log(JSON.parse(qwe.response))}