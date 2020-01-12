// on page load
window.addEventListener('load', () => {
    let long;
    let lat;
    let tempratureDescription = document.querySelector('.temprature-description');
    let tempratureDegree = document.querySelector('.temprature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let ICON = document.querySelector('.icon');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long  = position.coords.longitude;
            lat   = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const API = `${proxy}https://api.darksky.net/forecast/70da67e5c26bcaf05abd28259558db91/${lat},${long}`;

            fetch(API)
            .then(response => {
                return response.json();
            })
            .then(data => {

                const {temperature, summary, icon} = data.currently;
                // Update DOM
                tempratureDegree.textContent = temperature;
                tempratureDescription.textContent = summary;

                locationTimezone.textContent = data.timezone;

                // SET ICON
                setIcons(icon, ICON);
            });
        });

    }


    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); 
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});