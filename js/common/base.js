class basejs {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }

    setDataUrl() {

    }

    initEvents() {
        var me = this;
        //Sự kiện click khi thêm mới
        $(".content-feature").click(function() {
            //Hiển thị dialog thông tin chi tiết
            $(".m-dialog").show();
        });

        //Sự kiện click dấu X hay hủy để thoát
        $(".btn-exit ,.btn-close").click(function() {
            //Ẩn dialog thông tin chi tiết
            $(".m-dialog").hide();
        });

        //Thực hiện lưu dữ liệu khi ấn button
        $(".btn-save").click(function() {
            //validate dữ liệu
            var inputvalidates = $('.input-required , input[type="email"]');
            $.each(inputvalidates, function(index, input) {
                var value = $(input).val();
                $(input).trigger('blur');
            });
            var isnotvalidate = $('input[validate="false"]');
            if (isnotvalidate && isnotvalidate.length > 0) {
                alert("Vui long dien day du thong tin");
                isnotvalidate.focus();
            } else {
                alert("thanh cong");
            }
            //Thu thập thông tin được nhập --> build thành project
            var customer = {
                "CustomerCode": $('#txtCustomerCode').val(),
                "FullName": $('#txtFullName').val(),
                "Address": $('#txtAddress').val(),
                "DateOfBirth": $('#dtDateOfBirth').val(),
                "Email": $('#txtEmail').val(),
                "PhoneNumer": $('#txtPhoneNumber').val(),
                "GenderName": $('input[name="gioitinh"]:checked').val(),
                "MemberCardCode": $('#txtMemberCardCode').val(),
                "CustomerGroupName": $('#cbxCustomerGroupName').val(),
                "CompanyName": $('#txtCompanyName').val(),
                "CompanyTaxCode": $('#txtCompanyTaxCode').val()
            }
            console.log(customer);
            // Gọi server tương ứng lưu dữ liệu
            $.ajax({
                type: "POST",
                url: "http://api.manhnv.net/api/customers",
                data: JSON.stringify(customer),
                // contentType: "application/json",
                dataType: "dataType"
            }).done(function(res) {
                debugger;
            }).fail(function() {
                debugger;
            });
            //Sau khi thành công thì đưa thông báo:
            // ẩn form chi tiết
            //  load lại dữ liệu
        });

        //Load lại dữ liệu
        $(".m-btn-refresh").click(function() {
            me.loadData();

        });

        //Khi nhấn đúp chuột chọn 1 bản ghi trên danh sách
        $('table tbody').on('dblclick', 'tr', function() {
            $(".m-dialog").show();
        });

        /**
         * validate bắt bược nhập:
         * Creater: VCCONG 26/03/2021
         */
        $('.input-required').blur(function() {
            //js thuan
            // this.classList.add("border-red");
            //Kiểm tra dữ liệu nhập, nếu trống cảnh báo
            var value = $(this).val();
            if (value == "") {
                $(this).addClass('border-red');
                $(this).attr("title", 'Trường này không được trống');
                $(this).attr("validate", "false");
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", "true");
            }
        })

        /**
         * validate kiểm tra nhập email đúng định dạng
         * Creater: VCCONG 26/03/2021
         */
        $('input[type=email]').blur(function() {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
            if (regex.test($(this).val()) == false) {
                $(this).addClass('border-red');
                $(this).attr("title", 'Email không đúng định dạng')
                $(this).attr("validate", "false");
            } else {
                $(this).attr("title", '')
                $(this).removeClass('border-red');
                $(this).attr("validate", "true");
            }
        })
    }

    /**--------------------------------------
     * Load dữ liệu
     * CreateBy: VCCong (23/3/2021)
     */
    loadData() {
        try {
            $('table tbody').empty();
            //Laays thông tin các cột dữ liệu
            var ths = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $.ajax({
                    url: getDataUrl,
                    method: "GET",

                }).done(function(res) {
                    $.each(res, function(index, obj) {
                        var tr = $(`<tr></tr>`);
                        //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                        $.each(ths, function(index, th) {
                            var td = $(`<td><span></span></td>`);
                            var fieldName = $(th).attr('fieldname');
                            var value = obj[fieldName];
                            var formetType = $(th).attr('formatType');
                            switch (formetType) {
                                case "ddmmyyyy":
                                    value = fomartdate(value);
                                    td.addClass("text-align-center");
                                    break;
                                case "MoneyVND":
                                    value = formatMoney(value);
                                    td.addClass("text-align-right");
                                    break;
                                case "sex":
                                    value = formatGender(value);
                                    break;
                                default:
                                    break;
                            }

                            td.append(value);
                            $(tr).append(td);

                        })
                        $('table tbody').append(tr);
                    })

                }).fail(function(res) {})
                // BINDING DỮ LIỆU LÊN TABLE
        } catch (e) {
            //Ghi log lỗi
            console.log(e);
        }
    }
}