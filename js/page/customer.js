$(document).ready(function() {

        // $('.nav-item-employee').click(function() {
        //         window.location.href = "employee.html";
        // })
        new customerjs();
    })
    /**-------------------------------------------
     * Quản lý sự kiện trnag employee
     * CreateBy: VCCONG(19/3/2021)
     */


class customerjs extends basejs {
    constructor() {
        super();
    }

    setDataUrl() {
            this.getDataUrl = "http://api.manhnv.net/api/customers";
        }
        /**
         * Thêm dữ liệu
         * CreateBy: VCCONG(19/3/2021)
         */
    add() {

        }
        /**
         * Sửa dữ liệu
         * CreateBy: VCCONG(19/3/2021)
         */
    edit() {

        }
        /**
         * Xóa dữ liệu
         * CreateBy: VCCONG(19/3/2021)
         */
    delete() {

    }
}