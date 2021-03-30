$(document).ready(function() {

        // $('.nav-item-customer').click(function() {
        //     window.location.href = "customer.html";
        // })
        new employeejs();
    })
    /**-------------------------------------------
     * Quản lý sự kiện trnag employee
     * CreateBy: VCCONG(19/3/2021)
     */
class employeejs extends basejs {
    constructor() {
        super();
    }

    setApiRouter() {
        this.apiRouter = "api/employees";
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