/**
 * 
 * @param {*} value giá trị chuỗi cần kiểm tra
 * @param {*} minLength độ dài tối thiểu của chuỗi
 * @param {*} maxLength độ dài tối đa của chuỗi (nếu maxLegth = undefined và minLeght = 1 => kiểm tra rỗng)
 * @param {*} selector selector của thẻ cần hiển thị lỗi
 * @param {*} messErr lỗi cần hiển thị lên UI nếu value không thỏa mãn điều kiện
 * @returns 
 */

function kiemTraChuoi(value,minLength,maxLength,selector,messErr){
    if(value.trim().length < Number(minLength) || value.trim().length > Number(maxLength) ){
        getElement("#tbTKNV").style.display = "block"
        getElement(selector).innerHTML =  messErr;
        
        return false;
    }else{
        getElement(selector).innerHTML = '';
        return true;
    }
}