function DSNV(){
    this.arrNV = [] //tạo mảng để lưu ?

    this.addNV = function(nhanVien){
        this.arrNV.push(nhanVien);
    }

    //
    this.timNV = function(tknv){
        for(var i = 0; i < this.arrNV.length; i++){
            var maNV = this.arrNV[i].tknv;
            if(maNV === tknv){
                return i;
            }
        }
    }
}