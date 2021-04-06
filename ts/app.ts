let form = <HTMLFormElement> document.getElementById("form");
let message = <HTMLSpanElement> document.getElementById("message");
let main = <HTMLSpanElement> document.getElementById("main");
let container = <HTMLSpanElement> document.getElementById("container");
let btn = <HTMLButtonElement> document.getElementById("limpiar");
let btnMode = <HTMLButtonElement> document.getElementById("btn-mode");
let level = <HTMLInputElement> document.getElementById("level");
let output = <HTMLSpanElement> document.getElementById("range-value");
const invalidRut = <HTMLSpanElement> document.getElementById("form__invalid-rut");
const invalidName = <HTMLSpanElement> document.getElementById("form__invalid-name");
const invalidLastName = <HTMLSpanElement> document.getElementById("form__invalid-lastName");
const invalidPhone = <HTMLSpanElement> document.getElementById("form__invalid-phone");
const invalidText = <HTMLSpanElement> document.getElementById("form__invalid-text");
const invalidEmail = <HTMLSpanElement> document.getElementById("form__invalid-email");
const checkboxLanguages = <HTMLSpanElement> document.getElementById("form__invalid-languages");
const invalidYears= <HTMLSpanElement> document.getElementById("form__invalid-years");
const description = <HTMLTextAreaElement> document.getElementById("description");
const phone = <HTMLButtonElement> document.getElementById("phone");
const email = <HTMLInputElement> form.elements.namedItem("email");

output.innerHTML = level.value;
level.oninput = function() {
    output.innerHTML = level.value;
}

phone.addEventListener("input", (event: Event) => {
    phone.oninput = function() {
        if (phone.value.length > 9) phone.value = phone.value.slice(0, 9); 
    }
});

btn.addEventListener("click", cleanData);

function cleanData(event: Event) {
    event.preventDefault();
    form.reset();
    output.innerHTML = "50";
    invalidRut.style.display = "none";
    checkboxLanguages.style.display = "none";
    invalidName.style.display = "none";
    invalidLastName.style.display = "none";
    invalidPhone.style.display = "none";
    invalidText.style.display = "none";
    invalidYears.style.display = "none";
    invalidEmail.style.display = "none";
}

form.addEventListener("submit", (event: Event) => {

    event.preventDefault();

    const rut = <HTMLInputElement> form.elements.namedItem("rut");
    const name = <HTMLInputElement> form.elements.namedItem("name");
    const lastname = <HTMLInputElement> form.elements.namedItem("lastname");
    const phone = <HTMLInputElement> form.elements.namedItem("phone");
    let selectedLanguages: string[] = [];
    const languages = <RadioNodeList> form.elements.namedItem("languages");
    const years = <RadioNodeList> form.elements.namedItem("years");
    
    languages.forEach((language: Node) => {
        const checkbox = <HTMLInputElement>language;
        if (checkbox.checked) selectedLanguages.push(checkbox.value);
    });

    if (validarRut(rut.value) === "true" && selectedLanguages.length > 0 && name.value.length > 0 && lastname.value.length > 0 && validarTelefono(phone.value) && description.value.length > 0 && years.value) {
        form.style.display = "none";
        message.innerHTML = '<h2>Hemos recibido sus datos, pronto estaremos en contacto</h2>';
        message.style.display ="block";
        return;
    }

    validateField(selectedLanguages, "Seleccione al menos un lenguage", checkboxLanguages);
    validateField(name.value, "Complete el campo Nombre", invalidName);
    validateField(lastname.value, "Complete el campo Apellidos", invalidLastName);
    validateField(description.value, "Debe completar este campo", invalidText);
    validateField(years.value, "Seleccione un año", invalidYears);
    validateEmail(email.value, "Email inválido", invalidEmail);

    if (!validarTelefono(phone.value)) {
        invalidPhone.innerHTML = "Número inválido, formato 9xxxxxxxx";
        invalidPhone.style.display = "block";
    } else {
        invalidPhone.style.display = "none";
    }

    if (validarRut(rut.value) !== "true") {
        invalidRut.innerHTML = `${validarRut(rut.value)}`;
        invalidRut.style.display = "block";
    } else {
        invalidRut.style.display = "none";
    }
});

function validarRut(rut: string): string {

    if (rut.match(/\./) || !rut.match(/\-/g) || rut.split("-").length > 2) return "Rut inválido, formato 12345678-9";

    const [numeroRut, digitoVerificador] = rut.split("-");

    if (!numeroRut.match(/^[0-9]+$/) || !(numeroRut.length <= 8 && numeroRut.length > 6)) return "Número del rut inválido";

    const digitoCalculado = calcularDigitoVerificador(numeroRut);

    if (digitoCalculado !== digitoVerificador) return `Digito verificador inválido`;
    
    return "true";
}

function calcularDigitoVerificador(numeroRut: string): string {
    
    const numeros: string[] = numeroRut.split("");

    const arr: number[] = numeros.map(function(num) {
        return Number(num);
    });

    const serieNumerica = [2, 3, 4, 5, 6, 7, 2, 3];
    let sumaProductos = 0;
    const reverseArr = arr.reverse();

    reverseArr.map(function(num, i) {
        sumaProductos += num * serieNumerica[i];
    });

    const modulo = sumaProductos % 11;
    const resultado = 11 - modulo;

    if (resultado === 11) return "0";
    if (resultado === 10) return "k";

    return `${resultado}`;
}

function validarTelefono(telefono: string): boolean {
    if (!telefono.match(/^[0-9]+$/) || !(telefono.length === 9) || !(telefono[0] === "9") || !(telefono[0] === "9")) return false;

    return true;
}

function validateField(value: string | string[], message: string, element: HTMLSpanElement) {
    if ( value.length < 1) {
        element.innerHTML = message;
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function validateEmail(email: string, message: string, element: HTMLSpanElement) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) {
        element.innerHTML = message;
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}