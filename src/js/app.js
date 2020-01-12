import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import UI from "./config/ui.config";
import {validate} from "./helpers/validate";
import {showInputError ,removeInputError} from "./views/form";
import {login} from "./services/auth.service";
import {notify} from "./views/notifications";

const {form, inputEmail, inputPassword} = UI;
const inputs = [inputEmail, inputPassword];

//Events
form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach(input => {
  input.addEventListener('focus',e => {
    removeInputError(input);
  });
});

//Handlers
async function onSubmit() {
  const isValidForm = inputs.every(el => {
    if (!validate(el)) {
      removeInputError(el);
      showInputError(el);
    }
    return validate(el);
  });

  if(!isValidForm) return;
  try {
    await login(inputEmail.value, inputPassword.value);
    form.reset();
  //  Show success notify
    notify({msg: 'Login Success', className: 'alert-success'});
  }catch (e) {
  // Show error notify
    notify({msg: 'Login error', className: 'alert-danger'});
  }
}