function getElement(selector) {
    return document.querySelector(selector);
}

var arrNV = [];

function addNV() {
    var tknv = getElement("#getElement").value;
    var name = getElement("#name").value;
    var email = getElement("#email").value;
    var password = getElement("#password").value;
    var datepicker = getElement("#datepicker").value;

}
getElement("btnThemNV").onclick = addNV;