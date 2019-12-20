// Getting a link to the elements used in document

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading-gif');
const APIUrl = 'http://localhost:5000/tweets'
const errorElement = document.querySelector('.error-message');
const tweetsElement = document.querySelector('.tweets');
// Resestting everything when hit refresh
form.reset();
errorElement.style.display = 'none';

// Displaying loading.gif while getting the data from backend
loadingElement.style.display = '';
form.style.display = '';


listAllTweets();

// form.style.display = '';
loadingElement.style.display = 'none';


// performing operations on gathered elements
form.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    // formdata
    const tweet={
        name,
        content
    };

    // load GIF after submitting the form
    form.style.display='none';
    loadingElement.style.display='';
    

    // POSTing data to the express server
    fetch(APIUrl,{
        method: 'post',
        body: JSON.stringify(tweet),
        headers:{
            'content-type': 'application/json'
        }

    }).then(response => response.json())
      .then(createdTweet=>{
          console.log(createdTweet);
          form.reset();
          setTimeout(()=>{
            form.style.display='';

          }, 30000)
                    listAllTweets();
          loadingElement.style.display='none';
      }).catch(errorMessage =>{
        form.style.display='none';
        loadingElement.style.display='none';
        errorElement.style.display='';
      })
    
});

function listAllTweets(){
    tweetsElement.innerHTML = '';
    fetch(APIUrl)
    .then(response => response.json())
    .then(tweets => {
        console.log(tweets)
        tweets.reverse();
        tweets.forEach(element => {
            const div = document.createElement('div');
            
            const header = document.createElement('h3');
            header.textContent = element.name;

            const contents = document.createElement('p');
            contents.textContent = element.content;

            const date = document.createElement('small')
            date.textContent = (element.created)

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);
            
            tweetsElement.appendChild(div);
        });
    })

}