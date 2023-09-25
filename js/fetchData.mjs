export async function fetchData(lat,long) {
    let options = { method: 'GET' };
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m%2Cdewpoint_2m%2Capparent_temperature%2Cprecipitation_probability%2Crain%2Cshowers%2Cweathercode%2Cvisibility%2Cwindspeed_10m%2Cwinddirection_10m%2Cuv_index%2Cis_day&daily=weathercode%2Ctemperature_2m_max%2Ctemperature_2m_min%2Csunrise%2Csunset%2Cuv_index_max%2Cprecipitation_sum&current_weather=true&timezone=auto`;
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(url);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  