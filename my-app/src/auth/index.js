//isLoggedIn=>

export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null || data != undefined)
    { return true ;}
    else
    { return false; }
  };
  
  //doLogin=> data=>set to localstorage
  
  export const doLogin = (data,next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next()
  };
  
  //doLogout=> remove from localStorage
  
  export const doLogout = (next) => {
    localStorage.removeItem("data");
    next()
  };
  
  //get currentUser
  export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
      return JSON.parse(localStorage.getItem("data")).user;
    } else {
      return undefined;
    }
  };
  //get current user id
  export const getCurrentUserid = () => {
    if (isLoggedIn()) {
      console.log(JSON.parse(localStorage.getItem("data")).user.id)
      let userID=JSON.parse(localStorage.getItem("data")).user.id;
      return userID;
    } else {
      return 3;
    }
  };
  
  export const getToken=()=>{
    if(isLoggedIn()){
      return JSON.parse(localStorage.getItem("data")).jwt
    }else{
      return null;
    }
  }

  export const roleByLoggedin=()=>
  {
    if(isLoggedIn()){
      const id =JSON.parse(localStorage.getItem("data")).user.userRole.id;
      console.log(id)
      if(id===1)
      {
        return "employee"
      }
      else if(id===2)
      {
        return "admin"
      }
      else if(id===3)
      {
        return "recruiter"
      }
    }
    else{
      return null;
    }
  }