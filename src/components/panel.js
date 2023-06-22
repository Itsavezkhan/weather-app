import React from 'react'
import { useEffect, useState } from 'react';
import img1 from './assets/cloudy.jpg';
import img2 from './assets/sunny.jpg';



function Panel () {
    const [search, setSearch] = useState();
    const [name, setName] = useState();
    const [temp, setTemp] = useState();
    const [daily, setDaily] = useState('');
    const [backimg, setBackimg] = useState(img1);

    useEffect(() => {
        fetchapi();
        setSearch()
    }, [setSearch])

    const fetchapi = async () => {
        const url = `https://api.weatherapi.com/v1/current.json?key=101e47a0011b4df5af6141047231206&q=${search}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
          });
        const resjson = await response.json();
        console.log(resjson.current)
        setName(resjson.location);
        setTemp(resjson.current);
        setDaily(resjson.current);

        // if(daily?.text === 'sunny'){
        //     setBackimg(img2)
        // }else{
        //     setBackimg(img1)
        // }

         
       
    }
       
    
    // style={{ backgroundImage: "url(/img/sunny.jpg)" }}
  return (
      
     <>
        <div className='container' style={{ backgroundImage: `url(${backimg})`}} >
        <div className='panel' >

            <div className='input_field'>
                <input className='input'type='text' 
                 placeholder='Enter the city...'  onChange={(event) => setSearch(event.target.value)} /> 

                <button className='btn' onClick={fetchapi}>search</button>
            </div>
            <div className='top_info'>
                
                <h3>{name?.country}</h3>
                <h3>{name?.region}</h3>
                <h3>{name?.name}</h3>
                <h3>{name?.localtime}</h3>
               
            </div>

            <div className='middle_info ' >
                <h3>{temp?.temp_c} °C</h3>
                <h3>{temp?.temp_f}°F</h3>

            </div>

            <div className='btm_info'>
                <h3>{daily?.text}</h3>
                <img style={{width: '90px'}} src={daily?.icon} />
           
            </div>

            <div className='btm_info'>
                <h3><span>{temp?.wind_kph}</span> Wind in kph</h3>
                <h3><span >{temp?.humidity}</span> humidity</h3>
                
            </div>


        </div>
        </div>
     
    </>
  
   
  )
}

export default Panel
