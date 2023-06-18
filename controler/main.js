function getElement(selector) {
    return document.querySelector(selector);
}

var dsnv = new DSNV();

//Lấy thông tin người dùng nhập vào
function getThongTin() { //#1

    var tknv = getElement("#tknv").value;
    var name = getElement("#name").value;
    var email = getElement("#email").value;
    var password = getElement("#password").value;
    var datepicker = getElement("#datepicker").value;
    var luongCB = +getElement("#luongCB").value;
    var chucvu = getElement("#chucvu").value;
    var gioLam = +getElement("#gioLam").value;


    var nhanVien = new NhanVien(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);
    // console.log(nhanVien);
    // console.log(dsnv.arrNV);
    setLocalStorage();
    getLocalStorage();

    displayThongTin();

    return nhanVien;
}

getElement("#btnThemNV").onclick = function () {
    var nhanVien = getThongTin(false)
    if (nhanVien) {
        dsnv.addNV(nhanVien);
        displayThongTin();
        setLocalStorage();
    }
};


//Dùng Enter
// var input = document.querySelectorAll("input");

// for (var i = 0; i < input.length; i++) {
//     input[i].addEventListener("keypress", function (event) {
//         if (event.keyCode === 13) {  //
//             getThongTin();
//         }
//     })
// }

function displayThongTin(arrNV = dsnv.arrNV) { //thiếu xếp loại nhân viên
    var content = '';
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        nv = arrNV[i]
        content += `
            <tr>
                <td>${nv.tknv}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>               
                <td>${nv.datepicker}</td>
                <td>${nv.chucvu}</td>
                <td>${nv.tinhLuong()}</td>   
                <td>${nv.xepLoai()} </td>            
                <td> 
                    <button class="btn btn-success mr-3" id="btnEdit"
                            onclick = "updateNV('${nv.tknv}')" data-toggle="modal" data-target="#myModal">
                            Chỉnh sửa
                    </button>                     
                    <button class="btn btn-danger mr-3" onclick = "deleteNV('${nv.tknv}')">Xóa</button> 
                </td>
            </td>
        `
    }
    getElement("#tableDanhSach").innerHTML = content
}

//lưu xuống local
function setLocalStorage() {

    // console.log(dsnv.arrNV);
    var data = JSON.stringify(dsnv.arrNV); //stringify: chuyển sang kiểu string
    localStorage.setItem("DSNV", data);

}

//lấy danh sách từ local
function getLocalStorage() {
    var data = localStorage.getItem("DSNV");

    if (data) {
        var pareData = JSON.parse(data); //chuyển sang kiểu dữ liệu mảng

        var arr = [];//tạo lại dsnv để lưu

        for (var i = 0; i < pareData.length; i++) {
            var nv = pareData[i]
            //tạo lại đối tượng Nhân viên từ NhanVien
            var nhanVien = new NhanVien(nv.tknv, nv.name, nv.email, nv.password, nv.datepicker, nv.luongCB, nv.chucvu, nv.gioLam)

            arr.push(nhanVien)
        }

        dsnv.arrNV = arr;
        displayThongTin();
    }
}

//hiện thông tin lên table


// Xóa nhân viên
function deleteNV(tknv) {
    dsnv.deleteNV(tknv)
    displayThongTin();
    setLocalStorage();
}

//Cập nhật nhân viên
function updateNV(tknv) {

    var index = dsnv.findNV(tknv);
    var nv = dsnv.arrNV[index];

    // console.log("nv: ", nv);

    getElement("#tknv").value = nv.tknv;
    getElement("#name").value = nv.name;
    getElement("#email").value = nv.email;
    getElement("#password").value = nv.password;
    getElement("#datepicker").value = nv.datepicker;
    getElement("#luongCB").value = nv.luongCB;
    getElement("#chucvu").value = nv.chucvu;
    getElement("#gioLam").value = nv.gioLam;

}

//C
getElement("#btnCapNhat").onclick = function () {
    var nhanVien = getThongTin(true);
    dsnv.editNV(nhanVien);
    displayThongTin();
    setLocalStorage();

    // getElement("#form").reset();
}