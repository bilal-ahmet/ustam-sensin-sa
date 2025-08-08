export function isValidPhone(phone) {
  if (!phone) return false;
  const trMobile = /^(\+?90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  const generic = /^[0-9\s()+-]{10,16}$/;
  return trMobile.test(phone) || generic.test(phone);
}

export function applyBootstrapValidation(formElement) {
  formElement.classList.add('was-validated');
}


