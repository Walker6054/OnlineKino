var butt = document.getElementById("commit");
console.log(butt);

butt.addEventListener("click", () => {
    let myRequest = new XMLHttpRequest();
    myRequest.open("post", "/request", true);
    myRequest.send(butt);
    myRequest.onload = () => {
        console.log(myRequest.response)
    };
});


// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// const csrftoken = getCookie('csrftoken');