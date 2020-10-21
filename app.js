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

PROJECT REQUIREMENTS
1. ReadMe
2. Utilize Flexbox/grid
3. Secondary HTML page
4. two event handlers
5. 20 git commits
6. Clean Code



CHALLENGES: 
Figuring out how to withdraw the longitude and latitude values out of each code function
NPM errors, wtf do I do

HANGUPS:

Second HTML: Need to have an additional HTML page


STRETCH:
More stupid addresses
More stupid CSS themes


/**STRETCH GOALS
 * 
 * 
Could be fun to just give them a random location instead of letting them pick a new one
-Make an array of stupid default locations
-Start with Margaritaville, when MVP is met, make array to store BS addresses
-like Margaritaville in Florida
-or the last blockbuster, in Bend, Oregon
-Alamogordo, New Mexico mass burial of ET games
-world's largest banana farm
-world's largest banana
-bluth banana stand location
-where bananas in pajamas was filmed
-where the factory that makes bananagrams is
-curious george theme park
-Cocomo, Indiana John Stamos played Steel Drums

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
const startingAddress = document.getElementById("startingAddress") //where the user types their address
let bsAddress = "245 Front Street, Key West, FL 33040" //this will later be a math random at an array of bs addresses
let addressInput = startingAddress.value || bsAddress //gives user address OR if null, Margaritaville, etc
const GMAP_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressInput}&key=${GMAP_KEY}`
const banana = 18 //This may be useful later
const kM = 100000 //this is just how many CM are in one KM


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


userForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    
    let issLatitude = 0
    let issLongitude = 0
    let userLatitude = 0
    let userLongitude = 0

    

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
    let distanceKM = (Math.sqrt( ((issLongitude - userLongitude)**2) + ((issLatitude - userLatitude)**2)))*111;
    console.log(`Coordinates:`, issLongitude, userLongitude, issLatitude, userLatitude)

    let bananaDistance = distanceKM/(banana/kM)
    let realDistance = document.createElement('h2')
    let distanceNannerfied = document.createElement('h2')
    realDistance.innerHTML = `Your distance is ${distanceKM}KM`
    distanceNannerfied.innerHTML = `Your distance is ${bananaDistance} bananas`

    console.log(`Distance KM: `, distanceKM)
    resultsDiv.appendChild(realDistance)
    resultsDiv.appendChild(distanceNannerfied)
    
})


userForm.addEventListener("submit", async (e) => {     //proof that anonymous functions are not that scary
    e.preventDefault()
    
    let issLatitude = 0
    let issLongitude = 0
    let userLatitude = 0
    let userLongitude = 0    

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
    let distanceKM = (Math.sqrt( ((issLongitude - userLongitude)**2) + ((issLatitude - userLatitude)**2)))*111;
    console.log(`Coordinates:`, issLongitude, userLongitude, issLatitude, userLatitude)

    let bananaDistance = distanceKM/(banana/kM)
    let realDistance = document.createElement('h2')
    let distanceNannerfied = document.createElement('h2')
    realDistance.innerHTML = `Your distance is ${distanceKM}KM`
    distanceNannerfied.innerHTML = `Your distance is ${bananaDistance} bananas`

    console.log(`Distance KM: `, distanceKM)
    resultsDiv.appendChild(realDistance)
    resultsDiv.appendChild(distanceNannerfied)
})


let bananaFacts = [
    "Today's common banana, the Cavendish, is different from the Gros Michael from before the 60s, as Gros Michael Bananas were wiped out by The Panama Disease. If you're curious what Gros Michael bananas tasted like, try a Banana-flavored Laffy Taffy or Runt! Its recipe is unchanged and based on the bananas of its time.",  
 "The inside of a banana peel can help relieve itching and inflammation, like from bug bites or poison ivy!", 
 "Bananas are considered a berry and the banana tree is actually an herb!", 
 "India consumes the most bananas in the world. In 2017, they ate more than the next three countries COMBINED.", 
 "There are more than 1,000 kinds of bananas, including Mona Lisa, Ice Cream, Goldfinger, and the Blue Java.", 
 "Rubbing a banana peel on a scratched CD will help fill the scratches without damaging the plastic finish!",
 "The slipping on a banana peel gag originates in the 1850s, when discarded peels would reach a gooey state after days or weeks of rotting."
]


let issFacts = [
    "The International Space Station has been continuously operated since November 2000",
 "The ISS moves five miles per second, and orbits the Earth every 90 minutes. That means every 24 hours, it experiences 16 sunrises and sunsets!",
"The internal pressurized volume of the ISS is 916 cubic meters. That means it could hold 7,328,000 bananas, but that would probably be a bad idea.",
 "The ISS uses about 1.5 MILLION lines of computer code. Its support on Earth uses an additional 3 million!",
]

let bananaFactButton = document.getElementById("banana-facts")


const theBananaFactor = () => {
    document.querySelector("#bananaFacts").textContent= `${
        bananaFacts[Math.floor(Math.random()*bananaFacts.length)]}`
    
    }    
    
bananaFactButton.addEventListener('click', theBananaFactor())
    
