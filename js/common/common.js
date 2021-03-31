function fomartdate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        return year + "-" + month + "-" + day;
    }
}

/**
 * Ham định dạng hiển thị tiền tệ
 * @param {Number} money Số tiền
 * CreateBy: VCCONG (19/03/2021)
 */

function formatMoney(money) {
    var formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND',
    });
    a = formatter.format(money);
    return a;
}

function formatGender(gender) {
    gender = gender == "Không xác định" ? " " : (gender);
    return gender;
}