export const userPostFetch = user => {
    return dispatch => {
      return fetch("http://192.249.18.169:8080/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            console.log("aaaaaaa");
          } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
          }
        })
    }
  }
  
  const loginUser = userObj => ({
      type: 'LOGIN_USER',
      payload: userObj
  })