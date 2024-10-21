const urlAPI = 'https://api.api-ninjas.com/v1/quotes?category=health';
const keyAPI = 'e7Z0YXfbotov5ztD7ATCDQ==ShoAHuP6hrb4LpJS';

window.onload = () => {
  main();
  setTimeout(getQuotes, 1000);
}

function main() {
  const button = document.getElementById('btn');
  const quotBody = document.getElementById('quot');
  const quotAuthor = document.getElementById('quotAuthor');

  button.addEventListener('click', getQuotes);  
}

const getQuotes = () => {
  fetch(urlAPI, {
    headers: {
      'X-Api-Key': keyAPI
    }
  })
  .then(data => data.json())
  .then(item => {
    quotBody.innerText = item[0].quote;
    quotAuthor.innerText = item[0].author;
  });
} 
