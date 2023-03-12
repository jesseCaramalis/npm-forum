export const postLogin = async (email: String, password: String) => {
      const response = await fetch('http://3.26.31.47:3000/auth/login', {
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
