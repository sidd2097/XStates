import React, {useState, useEffect} from 'react';
import './XStates.css';

const XStates = ()=> {
    const [countries, setCountries] = useState([]);
    const [selectedCountry , setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCountries();
    },[]);

    const fetchCountries = () => {
        fetch('https://crio-location-selector.onrender.com/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
            // console.log(countries)
    };

    const fetchStates = (countryName) => {
        fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
        
    };

    const fetchCities = (countryName, stateName) => {
        fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)
          .then(response => response.json())
          .then(data => setCities(data))
          .catch(error => console.error('Error fetching cities:', error));
          
      };

      const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);
        setSelectedState('');
        setSelectedCity('');
        fetchStates(selectedCountry);
        console.log(states)
      };

      const handleStateChange = (event) => {
        const selectedState = event.target.value;
        setSelectedState(selectedState);
        setSelectedCity('');
        fetchCities(selectedCountry, selectedState);
        
      }

      const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        setMessage(`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`);
      };

    return (
        <div className="x-states">
            <h1>Select Location</h1>
            <div className="dropdown-container">
                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option value={state} key={state}>{state}</option>
                    ))}
                </select>
                <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            {message && <p className='selected-message'>{message}</p>}
        </div>
    );
};

export default XStates;