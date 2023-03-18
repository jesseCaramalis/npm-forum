
//this function is used to post the login details to the backend
//it is called in the LoginScreen, and the email and password are passed as arguments.
//currently only the JWT token is saved in the secure store, but if the app were to be expanded, it would be necessary to save the logged in users details to global state.
//this would allow us to edit posts and comments only made by the user, and create useful features such as a profile page, or a list of posts made by the user.

export const postLogin = async (email: String, password: String) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }), 
    })
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
  const data = await response.json();
  return data;
  
  };
