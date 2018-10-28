var BASE_URL = 'http://oauth.ycyc580.com';

function importScript(src, callback) {
  var script = document.createElement('script');
  script.src = src;

  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = function() {
      resolve();
    };
  });
}
