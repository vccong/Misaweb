class basejs {
    constructor() {
        this.host = "http://api.manhnv.net/";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvents();
        this.loadData();

    }

    setApiRouter() {

    }

    initEvents() {
        var me = this;

        //Sự kiện click khi thêm mới
        $(".content-feature").click(function() {
            try {
                me.FormMode = "them";
                //Hiển thị dialog thông tin chi tiết
                $(".m-dialog").show();
                $('input[type="text"], input[type="tel"], input[type="email"], input[type="date"]').val(null);
                //load du lieu cho combobox
                var selects = $("select#cbxCustomerGroupName");
                selects.empty();
                //lay du lieu khach hang
                $('.loading').show();
                $.ajax({
                    type: "GET",
                    url: me.host + "api/customergroups",
                    success: function(response) {
                        $.each(response, function(index, item) {
                            var option = `<option value=${item.CustomerGroupId}>${item.CustomerGroupName}</option>`;
                            selects.append(option);
                        });
                    }
                });
                $('.loading').hide();
            } catch (e) {}
        });

        //Sự kiện click dấu X hay hủy để thoát
        $(".btn-exit ,.btn-close").click(function() {
            //Ẩn dialog thông tin chi tiết
            $(".m-dialog").hide();
        });

        //Thực hiện lưu dữ liệu khi ấn button
        $(".btn-save").click(function() {
            //validate dữ liệu
            try {

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
                    //Thu thập thông tin được nhập --> build thành project
                    // Lay tat ca control nhap lieu:
                    $('.loading').show();
                    var inputs = $('input[fieldName],select[fieldName]');
                    var entity = {};
                    $.each(inputs, function(index, input) {
                        var propetyName = $(this).attr('fieldName');
                        var value = $(this).val();
                        // Với input là radio thì lay value nếu attributed là checked
                        if ($(this).attr('type') == "radio") {
                            //this la radio
                            if (this.checked) {
                                entity[propetyName] = value;
                            }
                        } else {
                            entity[propetyName] = value;
                        }
                    });
                    var methode = "POST";
                    if (me.FormMode == "sua") {
                        methode = "PUT";
                        entity.CustomerId = me.recordId;
                    }
                    // Gọi server tương ứng lưu dữ liệu
                    $('.loading').show();
                    $.ajax({
                        method: methode,
                        url: me.host + me.apiRouter + "/" + me.recordId,
                        data: JSON.stringify(entity),
                        contentType: "application/json",
                        // dataType: "dataType"
                    }).done(function(res) {
                        //Sau khi thành công thì đưa thông báo:
                        // ẩn form chi tiết
                        //  load lại dữ liệu
                        if (me.FormMode = "sua") {
                            alert("sua thanh cong")
                        } else {
                            alert("Them thanh cong");
                        }
                        $('.m-dialog').hide();
                        me.loadData();
                        $('.loading').hide();
                    }).fail(function() {
                        $('.loading').hide();
                    });
                }
            } catch (e) {

            }
        });

        //Load lại dữ liệu
        $(".m-btn-refresh").click(function() {
            me.loadData();
        });

        //Khi nhấn đúp chuột chọn 1 bản ghi trên danh sách
        $('table tbody').on('dblclick', 'tr', function() {
            //Hiển thị dialog thông tin chi tiết
            $(this).addClass("row-select");
            me.FormMode = "sua";
            $('input[type="text"], input[type="tel"], input[type="email"]').val(null);
            //load du lieu cho combobox
            var selects = $("select#cbxCustomerGroupName");
            selects.empty();
            //lay du lieu khach hang
            $('.loading').show();
            $.ajax({
                type: "GET",
                url: me.host + "api/customergroups",
                success: function(response) {
                    $.each(response, function(index, item) {
                        var option = `<option value=${item.CustomerGroupId}>${item.CustomerGroupName}</option>`;
                        selects.append(option);
                    });
                }
            });
            $('.loading').hide();
            //Lấy khóa chỉnh bản ghi
            var recordId = $(this).data("recordId");
            me.recordId = recordId;
            // Gọi service lấy thông tin chi tiết qua id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET"
            }).done(function(res) {
                // Bindding du lieu len form chi tiet
                //Lay tat ca control nhap lieu
                var inputs = $('input[fieldName],select[fieldName]');
                $.each(inputs, function(index, input) {
                    var propetyName = $(this).attr('fieldName');
                    var value = res[propetyName];
                    if (propetyName == "DateOfBirth") {
                        value = fomartdate(value);
                    }
                    if (propetyName == "Gender") {
                        if (value == 0) {
                            $("#nu").prop('checked', true);
                        }
                        if (value == 1) {
                            $("#nam").prop('checked', true);
                        }
                    }
                    $(this).val(value);
                    // Với input là radio thì lay value nếu attributed là checked
                    // if ($(this).attr('type') == "radio") {
                    //     //this la radio
                    //     if (this.checked) {
                    //         entity[propetyName] = value;
                    //     }
                    // } else {
                    //     entity[propetyName] = value;
                    // }
                });
            }).fail(function(res) {

            });
            // Build lên form chi tiết
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
        var me = this;
        try {
            $('table tbody').empty();
            //Laays thông tin các cột dữ liệu
            var ths = $('table thead th');
            $('.loading').show();
            $.ajax({
                    url: me.host + me.apiRouter,
                    method: "GET",
                    async: true,
                }).done(function(res) {
                    $.each(res, function(index, obj) {
                        var tr = $(`<tr></tr>`);
                        $(tr).data('recordId', obj.CustomerId);
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
                    $('.loading').hide();
                }).fail(function(res) {
                    $('.loading').hide();
                })
                // BINDING DỮ LIỆU LÊN TABLE
        } catch (e) {
            //Ghi log lỗi
            console.log(e);
        }
    }
}