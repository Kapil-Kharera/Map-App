
const map = document.getElementById("map");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        const { latitude, longitude } = position.coords;
        const { timestamp } = position;
        console.log(latitude, longitude, timestamp);
        console.log(`https://www.google.com.pt/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude]

        const map = L.map('map').setView(coords, 13);
        console.log(map);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

       

        map.on('click', function(mapEvent) {
            console.log(mapEvent);
            
            const {lat, lng} = mapEvent.latlng;
            console.log(lat, lng);

            L.marker([lat, lng]).addTo(map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            }))
            .setPopupContent('Workout')
            .openPopup();

        });
    }, function () {
        alert('Could not get your position');
    });

}

