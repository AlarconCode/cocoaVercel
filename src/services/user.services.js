const url = import.meta.env.VITE_BASE_URL
console.log(url);

export const registerRequest = async (user) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  }

  try {

    const response = await fetch(`${url}register`, options)
    const json = await response.json()
    console.log(json);
    return json

  } catch (error) {
    console.log(error); 
  }
  
}

export const loginRequest = async (user) => {
  const options = {
    method: 'POST',
    credentials: 'include',
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

export const logoutRequest = async () => {

  
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json'
    }
  }


  try {

    const response = await fetch(`${url}logout`, options)
    const json = await response.json()
    return json

  } catch (error) {
    console.log(error); 
  }

}

export const isAuthRequest = async () => {

  const options = {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json'
    }
  }

  try {

    const response = await fetch(`${url}verify-token`, options)
    const json = await response.json()
    return json

  } catch (error) {
    console.log(error); 
  }

}
