/**
FROM THE TOP, DIRECTIONS



1. User inputs an address
2. Clicks Submit
3. NannerScanner takes the ISS current location in Long/Lat
4. And passes it as an argument for The NannerScannerJammer
5. Google Maps takes the user's address and turns it into Long/Lat
6. NannerScanner takes the Google Maps information and passes it as an argument for...
7. The NannerScannerJammer (NSJ)
8. NSJ takes both ISS & user Long & Lat as arguments for formula to calculate distance in KM
9. returned distance in KM is then turned into CM and divided by banana
10. User receives result of how many bananas appended to a div in HTML
11. Replacing results with new results as the NSJ is invoked


PROGRAMMING STEPS
    ☑︎1. Create necessary elements in HTML
    2. Create functions that will access API
    ☑︎3. Create Formula (NSJ) for calculating distance (and bananas)
    4. Access the long/lat values of respective maps
    5. Pass on long/lat values into NSJ and return results (in KM and Banana)
    6. Display results in km and banana for user
    7. Reset values when NSJ is invoked again
    8. Style CSS to look like an old terminal

CHALLENGES: 
    Figuring out how to withdraw the longitude and latitude values out of each code function
    NPM errors, wtf do I do

HANGUPS:

    Second HTML: Need to have an additional HTML page


STRETCH:
    More stupid addresses
    More stupid CSS themes





*/
console.log("://NANNER_SCANNER_TESTING")

if ('geolocation' in navigator) {
    console.log ('://NANNER_SCANNER_GEOLOCATION_UPLINK_ONLINE')
} else {
    console.log('yo ur browser suxxxx')
    alert("Sorry, but your browser's incompatible with the Nanner Scanner.")
}


const ISS_LOC = "http://api.open-notify.org/iss-now.json" //API for the ISS
const GMAP_KEY = "AIzaSyCIhMaab2I5DZf5GaWnhVxZL2He90U-wfA" //API Key for Google Maps
const startingAddress = document.getElementById("starting-address") //where the user types their address
let bsAddress = "245 Front Street, Key West, FL 33040" //this will later be a math random at an array of bs addresses
let addressInput = startingAddress.value || bsAddress //gives user address OR if null, Margaritaville, etc
const GMAP_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressInput}&key=${GMAP_KEY}`
const banana = 18 //This may be useful later
const kM = 100000 //this is just how many CM are in one KM
const distanceUnit = (111*kM) //and this is how many KM are in a unit of long/lat

const userSelect = document.getElementById("userSelect")
const userForm = document.getElementById("userAddress")
const resultsDiv = document.getElementById("results")

// userMap()
const useCurrentPosition = () => 
    navigator.geolocation.getCurrentPosition(position=> {
        position.coords.latitude, position.coords.longitude         
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
    })

//I need to add a separate thing similar to below, but for the use current location
userForm.addEventListener("submit", async (e) => {     //proof that anonymous functions are not that scary
    e.preventDefault()
    
    let issLatitude = 5
    let issLongitude = 4
    let userLatitude = 33
    let userLongitude = 21    

    try {
        const issResponse = await axios.get(ISS_LOC) 
        const userResponse = await axios.get(GMAP_URL)
        issLatitude = issResponse.data.iss_position.latitude
        issLongitude = issResponse.data.iss_position.longitude
        let userData = userResponse.data.results[0].geometry.location
        userLatitude = userData.lat
        userLongitude = userData.lng

    }
    catch(error){
        console.log(error)
    }
    
    console.log("://BANANA_BUTTON_VALUE_RECEIVED");
    let distanceKM = (Math.sqrt( ((issLongitude - userLongitude)**2) + ((issLatitude - userLatitude)**2)));
    console.log(`Coordinates:`, issLongitude, userLongitude, issLatitude, userLatitude)

    let bananaDistance =(distanceKM)/banana
    let realDistance = document.createElement('h2')
    let distanceNannerfied = document.createElement('h2')
    realDistance.innerHTML = `Your distance is ${distanceKM}KM`
    distanceNannerfied.innerHTML = `Your distance is ${bananaDistance} bananas`

    console.log(`Distance KM: `, distanceKM)
    resultsDiv.appendChild(realDistance)
    resultsDiv.appendChild(distanceNannerfied)
    
    //From here, it's going to take the users address and
    //input that as the value for google maps
    //Then it's going to take the longitude and latitude of it
    //which I need to grab in the userMap function
    //and put it as part of the argument in the distanceKM function
})
// //     This is my formula for getting the distance in KM
// let bananaDistance = (distanceKM*kM)/banana
// // this needs to be appended to a results div in the body of the index.html


    // I need to make the button run the distance-logger
    

// document.querySelector('.getDogs').addEventListener('click', getDogs)
// //FIND BUTTON, ADD EVENT LISTENER TO IT, CALL GET QUOTE FUNCTION ON CLICK
// document.querySelector('.button').addEventListener('click', getQuote)








/**STRETCH GOALS
 * 
 * 
Could be fun to just give them a random location instead of letting them pick a new one
-Make an array of stupid default locations
-Start with Margaritaville, when MVP is met, make array to store BS addresses
-like Margaritaville in Florida
-or the last blockbuster, in Bend, Oregon
-Alamogordo, New Mexico mass burial of ET games

 */