export const get = async (url, authFlag) => {
    try {
        let headers = {};
        headers["content-type"] = "application/json";
        if (authFlag) {
            headers["jwt"] = JSON.parse(localStorage.getItem('hrms_token')).token;
        }
        const response = await fetch(url, {
            method: "GET",
            headers
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
     
    }
};

export const post = async (url, body, authFlag) => {
    try {
        let headers = {};
        headers["content-type"] = "application/json";
        if (authFlag) {
            headers["jwt"] = JSON.parse(localStorage.getItem('hrms_token')).token;
        }

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
       
    }
};


export const postDocuments = async (url , formData) => {
   
  
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      // Handle upload errors gracefully (e.g., display an error message to the user)
    }
  };


export const put = async (url, body, authFlag) => {
    try {
        let headers = {};
        headers["content-type"] = "application/json";
        if (authFlag) {
            headers["jwt"] = JSON.parse(localStorage.getItem('hrms_token')).token;
        }

        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    
    }
};

export const deleteReq = async (url, authFlag) => {
    try {
        let headers = {};
        headers["content-type"] = "application/json";
        if (authFlag) {
            headers["jwt"] = JSON.parse(localStorage.getItem('hrms_token')).token;
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
