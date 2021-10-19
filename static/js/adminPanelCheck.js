localStorage.removeItem("adminLogin");

let buttonCommit = document.getElementById("submit");
buttonCommit.addEventListener("click", submitForm);

let inputLogin = document.getElementById("InputLogin");
let inputPassword = document.getElementById("InputLogin");

function submitForm() {
    if (inputLogin.value == "" || inputPassword.value == "") {
        alert("Пожалуйста заполните все поля!");
    } else {
        let req = new XMLHttpRequest();
            req.open("post", "/admin/checkPass", true);
            req.setRequestHeader(
                    'Content-Type',
                    'application/json'
                )
            let user = JSON.stringify({
                login: inputLogin.value,
                password: inputPassword.value
            })
            req.send(user);
            req.onload = () => {
                if (req.status == "404") {
                    alert(req.responseText);
                } else {
                    alert("Вход совершен успешно!");
                    localStorage.setItem("adminLogin", inputLogin.value);
                    document.location = document.URL + req.responseText;
                }
            }
    }
}