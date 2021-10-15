let qwe = new XMLHttpRequest();
    qwe.open("post", document.URL + "/admins", true);
    qwe.send("");
    qwe.onload = () => {console.log(JSON.parse(qwe.response))}