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
            alert("Luu ");

        });

        //Load lại dữ liệu
        $(".m-btn-refresh").click(function() {
            me.loadData();

        });

        //Khi nhấn đúp chuột chọn 1 bản ghi trên danh sách
        $('table tbody').on('dblclick', 'tr', function() {
            $(".m-dialog").show();
        });

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