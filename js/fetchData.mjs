//=====================================================
//fetch data from api.open-meteo.com & export response
// ===================================================


export async function fetchData(lat, long, url) {
  let options = { method: 'GET' };
  let apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}`

  let fetchUrl = apiUrl + url
  try {   
    const response = await fetch(fetchUrl, options);
    const data = await response.json(); 
    return data;
  } catch (err) {
    console.error(err);
    return err;
    // throw err;
  }
}
