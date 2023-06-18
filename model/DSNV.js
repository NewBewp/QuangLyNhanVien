function DSNV() {
    this.arrNV = [] //tạo mảng để lưu ?



    //tìm theo tknv
    this.findNV = function (tknv) {
        for (var i = 0; i < this.arrNV.length; i++) {
            var maNV = this.arrNV[i].tknv;
            if (maNV === tknv) {
                return i;
            }
        }
        return -1;
    }

    this.addNV = function (nhanVien) {
        this.arrNV.push(nhanVien);
    }

    //Xóa theo tknv
    this.deleteNV = function (tknv) {
        var index = this.findNV(tknv);
        if (index !== -1) {
            this.arrNV.splice(index, 1);
        }
    }

    // Cập nhật theo tknv
    this.editNV = function (nhanVien) {   
        console.log(nhanVien);     
        var index = this.findNV(nhanVien.tknv);
        if (index !== -1 ) {            
            this.arrNV[index] = nhanVien;
        }       
    }
}