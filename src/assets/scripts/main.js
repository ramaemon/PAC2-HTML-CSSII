/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

import * as bootstrap from 'bootstrap'

/**
 * Write any other JavaScript below
 */
window.addEventListener('load', () => {
  const container = document.querySelector('.views-container');

  if(!container) {
    console.error("Esto es un error");
    return;
  }

   window.loadView = async (view) => {
     try {
      const response = await fetch(`/views/${view}.html`);
      console.log(response);
      
      if(!response.ok)
        throw new Error('No se puede cargar la vista.');
      
      const html = await response.text();
      container.innerHTML = html;
     } catch (err) {
      container.innerHTML = '<p>Error</p>';
      console.error(err);

     }
   }

   loadView('home');

});

window.handleSubmit = event => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(() => window.location.href = "/views/contacto.html")
    .catch(error => {
      console.error("Error: ", error);
      alert(error);
    });
};