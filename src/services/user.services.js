export const registerRequest = async (user) => {
  const url = `http://localhost:4000/api/`
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  }

  try {

    const response = await fetch(`${url}register`, options)
    if (response.ok) {
      const json = await response.json()
      console.log(json);
      return json
    }

  } catch (error) {
    console.log(error); 
  }
  
}

export const loginRequest = async (user) => {
  const url = `http://localhost:4000/api/`
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  }

  try {

    const response = await fetch(`${url}login`, options)
    const json = await response.json()
    console.log(json);
    return json
    

  } catch (error) {
    console.log(error); 
  }
  
}
