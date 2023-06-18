function NhanVien(_tknv, _name, _email, _password, _datepicker, _luongCB, _chucvu, _gioLam) {
    this.tknv = _tknv;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.datepicker = _datepicker;
    this.luongCB = _luongCB;
    this.chucvu = _chucvu;
    this.gioLam = _gioLam;
    this.tinhLuong = function(){
        if (this.chucvu == "Giám đốc"){
            return this.luongCB * 3;
        }else if(this.chucvu == "Trưởng phòng"){
            return this.luongCB * 2;
        }else {
            return this.luongCB;
        }  
    }
    this.xepLoai = function(){
        var content = "";
        if(this.gioLam >= 192){
            return content = "Xuất sắc";
        }else if (this.gioLam >= 176 && this.gioLam <192){
            return content = "Giỏi";
        }else if ( this.gioLam >=160 && this.gioLam <176){
            return content = "Khá";
        }else {
            return content = "Trung bình";
        }
    }
}