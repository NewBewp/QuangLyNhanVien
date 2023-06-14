function getElement(selector) {
    return document.querySelector(selector);
}
var dsnv = new DSNV();

//Lấy thông tin người dùng nhập vào
function getThongTin() {
    var tknv = getElement("#tknv").value;
    var name = getElement("#name").value;
    var email = getElement("#email").value;
    var password = getElement("#password").value;
    var datepicker = getElement("#datepicker").value;
    var luongCB = getElement("#luongCB").value;
    var chucvu = getElement("#chucvu").value;
    var gioLam = getElement("#gioLam").value;

    var nhanVien = new NhanVien(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);
    // console.log(nhanVien);
    dsnv.addNV(nhanVien);
    // console.log(dsnv.arrNV);
    setLocalStorage();
    getLocalStorage();

    displayThongTin();
}
getElement("#btnThemNV").onclick = getThongTin;

//Dùng Enter
var input = document.querySelectorAll("input");

for (var i = 0; i < input.length; i++) {
    input[i].addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {  //
            getThongTin();
        }
    })
}

//lưu xuống local
function setLocalStorage() {

    // console.log(dsnv.arrNV);
    var data = JSON.stringify(dsnv.arrNV); //stringify: chuyển sang kiểu string

    console.log(data);
    localStorage.setItem("DSNV", data);

}

//lấy danh sách từ local
function getLocalStorage() {
    var data = localStorage.getItem("DSNV");

    if (data) {
        var pareData = JSON.parse(data); //chuyển sang kiểu dữ liệu mảng

        var dsnvtemp = [];//tạo lại dsnv để lưu

        for (var i = 0; i < pareData.length; i++) {
            var nv = pareData[i]
            //tạo lại đối tượng Nhân viên từ NhanVien
            var nhanVien = new NhanVien(nv.tknv, nv.name, nv.email, nv.password, nv.datepicker, nv.luongCB, nv.chucvu, nv.gioLam)

            dsnvtemp.push(nhanVien)
        }

        dsnv.arrNV = dsnvtemp;

        displayThongTin();
    }
}

//hiện thông tin lên table
function displayThongTin() { //thiếu xếp loại nhân viên
    var content = '';
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        content += `
            <tr>
                <td>${dsnv.arrNV[i].tknv}</td>
                <td>${dsnv.arrNV[i].name}</td>
                <td>${dsnv.arrNV[i].email}</td>
               
                <td>${dsnv.arrNV[i].datepicker}</td>
                <td>${dsnv.arrNV[i].chucvu}</td>
                <td>${dsnv.arrNV[i].luongCB}</td>   
                <td> Xếp loại </td>            
                <td> 
                    <button id="deleteNV">Xóa</button> 
                    <button id="editNV">Cập nhật</button>                     
                </td>
            </td>
        `
    }

    getElement("#tableDanhSach").innerHTML = content
}

// function tinhLuong()