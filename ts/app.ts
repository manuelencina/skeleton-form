let form = <HTMLFormElement> document.getElementById("form");
// let message: any = document.getElementById("message");
let message = <HTMLSpanElement> document.getElementById("message");

// let btn: any = document.getElementById("limpiar");
let btn = <HTMLButtonElement> document.getElementById("limpiar");

// let level: any = document.getElementById("level");
let level = <HTMLInputElement> document.getElementById("level");
// let output: any = document.getElementById("range-value");
let output = <HTMLSpanElement> document.getElementById("range-value");

const input = <HTMLSpanElement> document.getElementById("form__invalid-input");
const checkboxLanguages = <HTMLSpanElement> document.getElementById("form__invalid-languages");

output.innerHTML = level.value;

level.oninput = function() {
    // output.innerHTML = this.value;
    output.innerHTML = level.value;
}

btn.addEventListener("click", limpiarDatos);

function limpiarDatos(event: Event) {
    event.preventDefault();
    form.reset();
    output.innerHTML = "50";
    input.style.display = "none";
    checkboxLanguages.style.display = "none";
}

form.addEventListener("submit", (event: Event) => {

    event.preventDefault();

    const rut = <HTMLInputElement> form.elements.namedItem("rut");
    // const name = <HTMLInputElement> form.elements.namedItem("name");
    // const lastname = <HTMLInputElement> form.elements.namedItem("lastname");
    // const email = <HTMLInputElement> form.elements.namedItem("email");
    // const phone = <HTMLInputElement> form.elements.namedItem("phone");
    let selectedLanguages: string[] = [];
    const languages = <RadioNodeList> form.elements.namedItem("languages");
    // const input = <HTMLSpanElement> document.getElementById("form__invalid-input");
    // const checkboxLanguages = <HTMLSpanElement> document.getElementById("form__invalid-languages");

    languages.forEach((language: Node) => {
        const checkbox = <HTMLInputElement>language;
        if (checkbox.checked) selectedLanguages.push(checkbox.value);
    });
    
    if (validarRut(rut.value) === "true" && selectedLanguages.length > 0) {
        form.style.display = "none";
        message.innerHTML = '<h2>Hemos recibido sus datos, pronto estaremos en contacto</h2>';
        message.style.display ="block";
        return;
    }

    if ( selectedLanguages.length < 1) {
        checkboxLanguages.innerHTML = "Seleccione al menos un lenguage";
        checkboxLanguages.style.display = "block";
    } else {
        checkboxLanguages.style.display = "none";
    }

    if (validarRut(rut.value) !== "true") {
        input.style.display = "block";
        input.innerHTML = `${validarRut(rut.value)}`;
    } else {
        input.style.display = "none";
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
    // if (!telefono.match(/^[0-9]+$/) || !(telefono.length === 9) || !(telefono[0] === "9")) return false;
    // validar que sean solo digitos
    // if (!NaN())
    if (!(telefono[0] === "9")) return false;
    return true;
}
