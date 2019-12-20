const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages' : 'prod-url-here';


export function getMessages(){
    console.log("Inside getMessages()");
   return fetch(API_URL)
    .then(res => res.json())
    .then(messages => {
      const haveSeenLocation = {};
      return messages.reduce((all, message)=>{
        const key = `${message.latitude.toFixed(3)} ${message.longitude.toFixed(3)}`;
        if(haveSeenLocation[key]){
          haveSeenLocation[key].otherMessages = haveSeenLocation[key].otherMessages || [];
          haveSeenLocation[key].otherMessages.push(message);
        } else {
          haveSeenLocation[key] = message;
          all.push(message);
        }
        return all;
      }, []);
      
    });
}

export function getLocation(){
   console.log("Inside getLocation()")
   return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position); 
        resolve ({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
      }, () => {
        /**
         * TypeError: "NetworkError when attempting to fetch resource."
         * Due to CORS
        */
       resolve( fetch('https://ipapi.co/json')
        .then(response => 
            // console.log(response); 
            response.json()
        )
        .then(location => {
            return{
                lat: location.latitude,
                lng: location.longitude
            };
        }));
      });
    })
}
        

export function sendMessage(message) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(message)
    }).then(res => res.json());
  }