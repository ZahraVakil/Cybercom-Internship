// -------------------------------------XHR--------------------------------------------------

const getUsingXhr =()=>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"https://reqres.in/api/users?page=4&per_page=2", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
            if(xhr?.response){
                const responseData = JSON.parse(xhr?.response);
                console.log(responseData);
            }
        }
    };
    xhr.send();
};

const getSpecificXhr =()=>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"https://reqres.in/api/users/1", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
            if(xhr?.response){
                const responseData = JSON.parse(xhr?.response);
                console.log(responseData);
            }
        }
    };
    xhr.send();
};

const createUsingXhr =()=>{
    var xhr = new XMLHttpRequest();
    xhr.open('POST',"https://reqres.in/api/users", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201){
            if(xhr?.response){
                const responseData = JSON.parse(xhr?.response);
                console.log(responseData);
            }
        }
    };
    xhr.send({
        name: "Zahra",
        job: "developer",
    });
};


const updateUsingXhr = () =>{
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","https://reqres.in/api/users/2", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
            if(xhr?.response){
                const responseData = JSON.parse(xhr?.response);
                console.log(responseData);
            }
        }
    };
    xhr.send({
        name: "morpheus",
        job: "developer",
    });
};

const deleteUsingXhr =()=>{
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE',"https://reqres.in/api/users/3", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
            if(xhr?.response){
                const responseData = JSON.parse(xhr?.response);
                console.log(responseData);
            }
        }
    };
    xhr.send();
};

// -------------------------------------FETCH--------------------------------------------------

const getUsingFetch = () =>{
    fetch("https://reqres.in/api/users/", {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
    })

    .then((response) => response.json())
    .then((data) => console.log(data))
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))
}

const getSpecificFetch = () =>{
    fetch("https://reqres.in/api/users/3", {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
    })

    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err))
}

const deleteUsingFetch = () =>{
    fetch("https://reqres.in/api/users/3", {
        method: "DELETE"

    })

    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}


    //create data(put)
    
    async function putData() {
      const data = {
          id: 1245,
          name: "yashvi",
          age: 19
      };
    
      try {
          const response = await fetch('https://reqres.in/api/users', {
              method: "POST",
              body: JSON.stringify(data)
          });
    
          if (response.ok) {
              const responseData = await response.json();
              console.log(responseData);
          } else {
              console.log('Error:', response.status);
          }
      } catch (error) {
          console.error('Error:', error);
      }
    }
    
    //updtae data
    function updateData() {
      fetch('https://reqres.in/api/users/1245', {
        method: 'PUT',
        body: JSON.stringify({
          id: 1245,
          name: 'yashvi',
          age: 9
        })
      })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        console.log('Data updated successfully:', data);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
    }
    
    //delete
    function deleteData(){
      fetch('https://reqres.in/api/users/3',{
        method:'DELETE'
      })
      .then((response)=>console.log('deleted'))
      
      .catch((error)=>console.log(error))
    }


