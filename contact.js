const dialog = document.querySelector('#dialog-success');
const dialogFail = document.querySelector('#dialog-fail');
const dialogBtns = document.querySelectorAll('.dialog__button');
const contactForm = document.querySelector('#contact-form');
const sendBtn = document.querySelector('#submit-btn');

// function sendEmail() {
//   const link = `mailto:suncharn.pipithkul@gmail.com?
//                 cc=${contactForm.email.value}
//                 &subject=${encodeURIComponent(contactForm.subject.value)}
//                 &body=${encodeURIComponent(contactForm.message.value)}`;
  
//   window.location.href = link;
// }

// EmailJs
emailjs.init('ot_FMmAmzQlvOSlXs');

// Send email using EmailJs
async function sendEmail(subject, name, email, message) {
  try {
    // let res = await emailjs.send('contact_service', 'contact_form', {
    //   subject: subject,
    //   name: name,
    //   email: email,
    //   message: message
    // });

    // console.log('SUCCESS!', res?.status, res?.text); 
    dialog.showModal();
    contactForm.reset();

  } catch(error) {
    console.log('FAILED...', error);
    document.querySelector('#error-code').textContent = error.status;
    dialogFail.showModal();
  }
}

// Utility function to reset animation
function animationReset(animated) {
  animated.style.animation = 'none';
  animated.offsetHeight; // trigger layout reflow
  animated.style.animation = null;
}

// validate formfield and set valid/invalid style
function validate(formField) {
  const isValid = formField.checkValidity();
  const errorTooltip = formField.nextElementSibling;

  if (errorTooltip === null) return;

  if (isValid)
    formField.setAttribute('aria-hidden', true);
  else
    formField.setAttribute('aria-hidden', false);

  errorTooltip.style.opacity = !isValid ? 1 : 0;
  formField.classList.toggle('invalid-input', !isValid);
  formField.setAttribute("aria-invalid", !isValid);

  animationReset(formField);
  return isValid;
}

// remove error style on user input
for (const field of contactForm) {
  field.addEventListener('input', function(e) {
    field.classList.remove('invalid-input');
    field.setAttribute('aria-hidden', true);
    field.setAttribute("aria-invalid", false);
    field.nextElementSibling.style.opacity = 0;
  });
}

// Click contact form send button
sendBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // validate all fields & if any of them is false => form is invlid
  let valid = true;
  for (const field of contactForm) {
    if (validate(field) === false)
      valid = false;
  }

  if (valid) {
    const subject = contactForm.subject.value;
    const name = contactForm.name.value;
    const email = contactForm.email.value;
    const message = contactForm.message.value;

    (async() => {
      sendBtn.classList.add('button--loading');
      sendBtn.disabled = true;
      await sendEmail(subject, name, email, message);
      sendBtn.classList.remove('button--loading');
      sendBtn.disabled = false;
    })();
  }
});

for (const btn of dialogBtns) {
  btn.addEventListener('click', function() {
    btn.parentElement.close();
  });
}

