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
         * Load dữ liệu
         * CreateBy: VCCONG(19/3/2021)
         */
        // loaddata() {
        //         //LẤY DỮ LIỆU VỀ
        //         $.ajax({
        //                 url: "http://api.manhnv.net/api/customers",
        //                 method: "GET",
        //             }).done(function(res) {
        //                 var data = res;
        //                 $.each(data, function(index, item) {
        //                     var dateOfBirth = item["DateOfBirth"];
        //                     dateOfBirth = fomartdate(dateOfBirth);
        //                     var gender = item["GenderName"];
        //                     gender = gender == "Không xác định" ? " " : (gender);
        //                     var tr = $(`<tr> 
        //                                 <td>${[data[index].CustomerCode]}</td> 
        //                                 <td>${[data[index].FullName]}</td> 
        //                                 <td>${[gender]}</td> 
        //                                 <td>${[data[index].Address]}</td> 
        //                                 <td>${[dateOfBirth]}</td> 
        //                                 <td>${[data[index].Email]}</td>  
        //                                 <td>${[data[index].PhoneNumber]}</td> 
        //                                 <td>${[data[index].CustomerGroupName]}</td> 
        //                             </tr> `);
        //                     $('table tbody').append(tr);
        //                 })
        //             }).fail(function(res) {})
        //             // BINDING DỮ LIỆU LÊN TABLE
        //     }
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