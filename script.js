
'use strict';
// const map = document.getElementById("map");
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        const { latitude, longitude } = position.coords;
        // const { timestamp } = position;
        // console.log(latitude, longitude, timestamp);
        console.log(`https://www.google.com.pt/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude]

        map = L.map('map').setView(coords, 13);
        // console.log(map);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);



        map.on('click', function (mapE) {
            const mapEvent = mapE;
            console.log(mapEvent);

            form.classList.remove('hidden');
            inputDistance.focus();

        });
    }, function () {
        alert('Could not get your position');
    });

};


//form submit
form.addEventListener('submit', function (e) {

    e.preventDefault();

    //clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    //displaying Marker
    console.log(mapEvent);
    const { lat, lng } = mapEvent.latlng;
    console.log(lat, lng);
    const {x, y} = mapEvent.layerPoint;
    console.log(x,y)

    L.marker([lat, lng])
        .addTo(map)
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

// console.log(inputType);
inputType.addEventListener("change", function() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
