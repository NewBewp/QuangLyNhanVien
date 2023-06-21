function getElement(selector) {
    return document.querySelector(selector);
}

var dsnv = new DSNV();

//Lấy thông tin người dùng nhập vào
function getThongTin(isEdit) { //#1

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
    // console.log(dsnv.arrNV);
   

    var isValid = true;

    //kiểm tra tknv
    isValid &= kiemTraChuoi(nhanVien.tknv, 1, undefined, "#tbTKNV", "#tbTKNV", "Tài khoản nhân viên không được để trống") &&
        kiemTraChuoi(nhanVien.tknv, 4, 6, "#tbTKNV", "#tbTKNV", "Tài khoản từ 4 đến 6 ký tự")&&
        kiemTraTKNV(nhanVien.tknv, dsnv.arrNV, isEdit, "#tbTKNV", "Tài khoản nhân viên này đã tồn tại")

    // // kiểm tra tên nhân viên
    isValid &= kiemTraChuoi(nhanVien.name, 1, undefined, "#tbTen", "#tbTen", "Tên không được để trống") &&
        kiemTraPattern(nhanVien.name, "#tbTen", "#tbTen", /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/, "Tên chỉ được nhập chữ")

    //kiểm tra email
    isValid &= kiemTraChuoi(nhanVien.email, 1, undefined, "#tbEmail", "#tbEmail", "Email không được để trống") &&
        kiemTraPattern(nhanVien.email, "#tbEmail", "#tbEmail", /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, "Email không đúng định dạng")

    // kiểm tra password
    isValid &= kiemTraChuoi(nhanVien.password, 1, undefined, "#tbMatKhau", "#tbMatKhau", "Mật khẩu không được để trống") &&
        kiemTraChuoi(nhanVien.password, 6, 10, "#tbMatKhau", "#tbMatKhau", "Mật khẩu cần 6 đến 10 ký tự") &&
        kiemTraPattern(nhanVien.password, "#tbMatKhau", "#tbMatKhau", /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, "chứa 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    // kiểm tra ngày
    isValid &= kiemTraChuoi(nhanVien.datepicker, 1, undefined, "#tbNgay", "#tbNgay", "Ngày làm không được để trống") &&
        kiemTraPattern(nhanVien.datepicker, "#tbNgay", "#tbNgay", /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, "Định dạng ngày tháng không hợp lệ");

    // kiểm tra lương
    isValid &= kiemTraChuoi(nhanVien.luongCB, 1, undefined, "#tbLuongCB", "#tbLuongCB", "Lương không được để trống") &&
        kiemTraGiaTri(nhanVien.luongCB, 1000000, 20000000, "#tbLuongCB", "#tbLuongCB", "Lương cơ bản từ 1 000 000 đến 20 000 000") &&
        kiemTraPattern(nhanVien.luongCB, "#tbLuongCB", "#tbLuongCB", /^[0-9]+$/, "Lương chỉ được nhập số ")

    // Kiểm tra chức vụ
    isValid &= kiemTraChuoi(nhanVien.chucvu, 1, undefined, "#tbChucVu", "#tbChucVu", "Xin hãy chọn chức vụ")

    // kiểm tra số giờ làm
    isValid &= kiemTraChuoi(nhanVien.gioLam, 1, undefined, "#tbGiolam", "#tbGiolam", "Giờ làm không được để trống") &&
        kiemTraGiaTri(nhanVien.gioLam, 80, 200, "#tbGiolam", "#tbGiolam", "Giờ làm chỉ được nhập từ 80-200 giờ") &&
        kiemTraPattern(nhanVien.gioLam, "#tbGiolam", "#tbGiolam", /^[0-9]+$/, "Giờ làm chỉ được nhập số")

    if (isValid) {
        return nhanVien
    } else {
        return undefined;
    }

    // return isValid ? nhanVien :undefined;
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

//hiển thị bảng thông tin
function displayThongTin(arrNV = dsnv.arrNV) {
    var content = '';
    for (var i = 0; i < arrNV.length; i++) {
        nv = arrNV[i]
        content += `
            <tr>
                <td>${nv.tknv}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>               
                <td>${nv.datepicker}</td>
                <td>${nv.chucvu}</td>
                <td>${nv.tinhLuong()}</td>   
                <td id="xeploai">${nv.xepLoai()} </td>            
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

//Set onclick 
getElement("#btnCapNhat").onclick = function () {
    var nhanVien = getThongTin(true);
    dsnv.editNV(nhanVien);
    displayThongTin();
    setLocalStorage();
}

//Tìm kiểm theo xếp loại
getElement("#searchName").addEventListener("keyup", function () {
    var valueSearch = getElement("#searchName").value.toLowerCase();
    console.log("valueSearch: ", valueSearch);
    var arrNVSearch = [];
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var xepLoai = (dsnv.arrNV[i].xepLoai()).toLowerCase();
        // console.log("nv",xepLoai);
        if (xepLoai.search(valueSearch) !== -1) {
            arrNVSearch.push(dsnv.arrNV[i])
        }
    }
    displayThongTin(arrNVSearch);
})