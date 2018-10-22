var BASE_URL = 'http://106.12.145.154:2989'

function importScript(src,callback){
    var script =  document.createElement('script');
    script.src = src;

    document.head.appendChild(script);

    return new Promise((resolve,reject) => {
        script.onload = function(){
            resolve();
        }
    });
}

// function ready(){

// }


// window.addEventListener('load',function(){
//     importScript('./js/jquery-3.3.1.min.js').then(()=>{
//         $.ajaxSetup({
//             url: BASE_URL,
//         });
//         ready();
//     });
// });