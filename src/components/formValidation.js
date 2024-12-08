function formValidation() {
    let formId = document.getElementById('form');
    let name = document.getElementById('name') ? document.getElementById('name').value : '';
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    let reg_name = /^([a-zA-Z. ]{3,})$/;
    let reg_email = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,8})$/;
    let reg_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+?""\.])(?=.*[a-zA-Z0-9!@#$%^&*()_+?""\.]).{6,12}$/;
  
    let re_name = reg_name.test(name);
    let re_email = reg_email.test(email);
    let re_password = reg_password.test(password);
  
    if (formId) {
      if (email === "" && password === "") {
        alert("please enter details");
        return false;
      } else if (email === "") {
        alert("please enter email");
        return false;
      } else if (!re_email) {
        alert("please enter valid email");
        return false;
      } else if (password === "") {
        alert("please enter password");
        return false;
      } else if (!re_password) {
        alert("please enter valid password");
        return false;
      }
    } else {
      if (name === "" && email === "" && password === "") {
        alert("please enter details");
        return false;
      } else if (name === "") {
        alert("please enter name");
        return false;
      } else if (!re_name) {
        alert("please enter a valid name (at least 3 characters)");
        return false;
      }
      if (email === "") {
        alert("please enter email");
        return false;
      } else if (!re_email) {
        alert("please enter valid email");
        return false;
      }
      if (password === "") {
        alert("please enter password");
        return false;
      } else if (!re_password) {
        alert("please enter valid password");
        return false;
      }
    }
    return true
  }
   
  export default formValidation;
  