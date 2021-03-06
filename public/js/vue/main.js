Vue.config.productionTip = false;

window.VEvent = new Vue();
axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
    /*,'X-CSRF-TOKEN': $("meta[name='csrf-token']").attr('content')*/
};
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
let app_url = document.head.querySelector('meta[name="app-url"]').content;
const domain = app_url + '/';
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

/*
* ==================================
*             Routes
* ==================================
*
* */
/*const index = { template: '#index' }
const contact = { template: '#contact' }
const routes = [
    { path: '/', component: index },
    { path: '/contact', component: contact }
];
const router = new VueRouter({
    routes: routes // short for `routes: routes`
});*/

/*
* ==================================
*             Submit
* ==================================
*
* */
const submit0 = Vue.component('submit', {
    template: '#submit-template',

    /*props:[
        'btntext',
    ],*/
    props: {
        action: {
            default: "Submit",
            type: String
        },
        btncancel: {
            default: "Reset",
            type: String
        },
        btn_class: {
            default: "btn-success",
            type: String
        },
        btn_class_cancel: {
            default: "btn-danger",
            type: String
        },
        icon_class: {
            default: "",
            type: String
        },
        icon_class_cancel: {
            default: "",
            type: String
        },
        blade: {
            default: "",
            type: String
        }
    },
    data: function () {
        return {

            btnname: 'Submit 1',
            output: ''


        }
    },
    methods: {
        post: function (e) {
            e.preventDefault();
            let vm = this;
            let self = this;
            //const postClub = domain + 'clubs';
            let form = $(e.target).parent().closest('form');
            var postURL = form.attr('action');
            //var input = JSON.stringify(form.serializeArray());
            var input = form.serialize();

            axios.post(postURL, input, config)

                .then(function (response) {

                    //vm.output = response.data;
                    var results = response.data.data;
                    form.trigger('reset');
                    //alert(JSON.stringify(vm.output.data.message))
                    if (results.success) {

                        toastr.success(results.message)
                        toastr.options.timeOut = 3000; // 3s
                        //VEvent.$emit('submitted')


                        if (results.hasOwnProperty('goals')) {

                            var post = results.goals;
                            self.dataTable = $('#dynamic-table').DataTable();
                            //update selected row ...
                            //self.selectedRow.data(post).invalidate().draw()

                            //redraw the table ...
                            self.dataTable.clear().draw(); // clear data
                            self.dataTable.rows.add(post); // Add new data
                            self.dataTable.columns.adjust().draw(); // Redraw the DataTable

                            //update tab count
                            var rowCount = self.dataTable.page.info().recordsTotal;
                            $("span[id=friends]").text('My Goals (' + rowCount + ')');
                        }


                    } else {
                        toastr.error(results.message)
                        toastr.options.timeOut = 3000; // 3s
                    }
                    console.log(vm.output);
                    vm.loadContent(response)

                    //call method, refresh table data
                    //this.$root.$emit('submitted') //like this


                    VEvent.$emit('submitted')


                })

                .catch(function (error) {

                    this.name = error;

                });
        },
        clearform: function (e) {
            e.preventDefault();
            let vm = this;
            //const postClub = domain + 'clubs';
            var form = $(e.target).parent().closest('form');
            form.trigger('reset');
        },
        loadContent: function (response) {
            let vm = this;
            if (vm.blade.contains('pending')) {
                if (response.length > 0) {
                    $(".tab-content").html(response);
                    window.init.loadGallery(true, 'a.thumbnail');

                    var count = $('div[type=pending-counter]').attr('count');
                    $("span[id=pending]").text('Bucketlist(' + count + ')');

                    var countCompleted = $('div[type=completed-counter]').attr('count');
                    $("span[id=completed]").text('Completed(' + countCompleted + ')');
                    var photoscount = $('div[type=photos-counter]').attr('count');
                    $("span[id=photos]").text('Photos(' + photoscount + ')');
                }
            }
        }
    },
    mounted: function () {
        //alert('submitt')
        this.dataTable = null;
    }

});

/*
* ==================================
*             Upload File
* ==================================
*
* */
const upload0 = Vue.component('upload', {
    template: '#upload-template',
    mounted: function () {
        $('.pic').click(function (e) {
            e.preventDefault()
            $(this).parent().closest('.usr-pic').find('input[type="file"]').click();
        });
    },
    /*props:[
        'action',
    ],*/
    props: {
        path: {
            default: "/uploads/avatar/placeholder.png",
            type: String
        },
        url: {
            default: "",
            type: String
        },
        directory: {
            default: "avatars",
            type: String
        },
        info: {
            default: "",
            type: String
        },

        quantity: {
            default: "",
            type: String
        }
    },
    data: function () {

        return {

            btnname: 'Submit 1',
            output: ''


        }
    }, computed: {
        state() {
            return this.quantity;
        }
    },
    methods: {

        uploadImage(event) {
            event.preventDefault()

            const URL = this.url;
            let vm = this;

            /*let data = new FormData();
            data.append('name', 'my-picture');
            data.append('file', event.target.files[0]);
            data.append('image', event.target.files[0], event.target.files[0].name);*/

            files = event.target.files;
            var data = new FormData();
            var error = 0;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file.type);
                if (!file.type.match('image.*') && !file.type.match('application.*') && !file.type.match('plain.*') && !file.type.match('text.*')) {
                    $("#drop-box").html("<p> Images only. Select another file</p>");
                    error = 1;
                } else if (file.size > (1048576) * 50) {
                    $("#drop-box").html("<p> Too large Payload. Select another file</p>");
                    error = 1;
                } else {
                    data.append('files[]', file, file.name);
                    var file_dir = vm.directory;//$(this).parent().closest('.usr-pic').find('span[folder=directory]').attr('value');
                    if (file_dir === 'images') {
                        $("#drop-box").html('<p class="label label-info">Please Wait ...</p>');
                    } else {
                        $("#drop-box").html('<p class="label label-info">Please Wait ...</p>');
                    }

                    data.append('directory', file_dir);
                    $("input[name=image]").val(file.name).trigger('input');
                }
            }


            let config = {
                header: {
                    'Content-Type': 'image/*'
                }
            }

            axios.post(
                URL,
                data,
                config
            ).then(
                response => {
                    //console.log(response)
                    let img = response.data.data[0].files;
                    let src = this.path + '/' + img;
                    //$('.profile__img img').attr("src",src);
                    //$('#image_preview').append("<img src='" + src + "'>");
                    var jsonResponse = JSON.parse(response.request.response);
                    $(jsonResponse.data).each(function (k, v) {
                        //console.log('files ... > ',v.files)
                        var files = v.files;
                        $('input[name=all_files]').val(files).trigger('input');

                    });
                    console.log('image upload response > ', $("input[name=all_files]").val())

                    /*Snackbar.show({
                        text: response.data.data[0].message,
                        backgroundColor: '#00A8F3',
                        showAction: false,
                        duration: 5000
                    });*/
                }
            )
        }
    }
});
const profile_pic = Vue.component('profile_pic', {
    template: '#upload-profile-template',
    mounted: function () {
        $('.pic').click(function (e) {
            e.preventDefault()
            $(this).parent().closest('.usr-pic').find('input[type="file"]').click();
        });
    },
    /*props:[
        'action',
    ],*/
    props: {
        path: {
            default: "/uploads/avatar/placeholder.png",
            type: String
        },
        url: {
            default: "",
            type: String
        },
        directory: {
            default: "avatars",
            type: String
        },
        info: {
            default: "",
            type: String
        }
    },
    data: function () {

        return {

            btnname: 'Submit 1',
            output: ''


        }
    },
    methods: {

        uploadImage(event) {
            event.preventDefault()

            const URL = this.url;
            let vm = this;

            /*let data = new FormData();
            data.append('name', 'my-picture');
            data.append('file', event.target.files[0]);
            data.append('image', event.target.files[0], event.target.files[0].name);*/

            files = event.target.files;
            var data = new FormData();
            var error = 0;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file.type);
                if (!file.type.match('image.*') && !file.type.match('application.*') && !file.type.match('plain.*') && !file.type.match('text.*')) {
                    $("#drop-box").html("<p> Images only. Select another file</p>");
                    error = 1;
                } else if (file.size > (1048576) * 50) {
                    $("#drop-box").html("<p> Too large Payload. Select another file</p>");
                    error = 1;
                } else {
                    data.append('image', file, file.name);
                    var file_dir = vm.directory;//$(this).parent().closest('.usr-pic').find('span[folder=directory]').attr('value');
                    if (file_dir === 'images') {
                        $("#drop-box").html('<p class="label label-info">Please Wait ...</p>');
                    } else {
                        $("#drop-box").html('<p class="label label-info">Please Wait ...</p>');
                    }

                    data.append('directory', file_dir);
                    $("input[name=image]").val(file.name).trigger('input');
                }
            }


            let config = {
                header: {
                    'Content-Type': 'image/*'
                }
            }

            axios.post(
                URL,
                data,
                config
            ).then(
                response => {
                    //console.log(response)
                    var results = response.data;
                    let img = results.filename;
                    let src = this.path + '/' + img;
                    //alert(src)
                    $('.usr-pic img').attr("src", src);
                    $('.usr-pic-lg img').attr("src", src);
                    $("#drop-box").empty();
                    toastr.success(results.message)
                    toastr.options.timeOut = 3000;
                    //$('#image_preview').append("<img src='" + src + "'>");
                    /*var jsonResponse = JSON.parse(response.request.response);
                    $(jsonResponse.data).each(function (k, v) {
                        //console.log('files ... > ',v.files)
                        var files = v.files;
                        $('input[name=all_files]').val(files).trigger('input');

                    });
                    console.log('image upload response > ',  $("input[name=all_files]").val())*/

                    /*Snackbar.show({
                        text: response.data.data[0].message,
                        backgroundColor: '#00A8F3',
                        showAction: false,
                        duration: 5000
                    });*/
                }
            )
        }
    }
});
const comments = Vue.component('comments', {
    template: '#comments-template',
    //props: ['titles','data','url','action','ctitle','btntext'],
    props: {
        titles: {
            default: "",
            type: String
        },
        data: {
            default: "",
            type: String
        },
        url: {
            type: String
        },
        action: {
            default: "",
            type: String
        },
        ctitle: {
            default: "",
            type: String
        },
        btntext: {
            default: "Submit",
            type: String
        },
        akey: {
            default: "id",
            type: String
        },
        submit_btn_visibility: {
            default: "true",
            type: String
        }
    },
    data() {
        //this.ops = '';
        let vm = this;
        return {
            results: ''
        }
    },
    mounted() {
        let vm = this;
        //var ckey = window;
        vm.getComments();
        VEvent.$on('submitted', function () {
            //alert();
            vm.getComments()
        });
        /*this.$root.$on('submitted', () => {
            // your code goes here
            vm.getComments();
        });*/
    },
    methods: {


        getComments() {

            let vm = this;

            axios.get(vm.url)

                .then(function (response) {

                    //console.log(response.data.data);

                    //let vm = this;
                    let val = response.data.data;
                    vm.results = val;

                })

                .catch(function (error) {


                });

        }
    }
});

const tabledata = Vue.component('tabledata', {
    template: '#tabledata',
    props: ['titles', 'data', 'url'],
    data() {
        return {

            rows: [],
            dtHandle: null
        }
    },
    mounted() {
        let vm = this;
        element = this.$el;
        this.getTData();
        VEvent.$on('submitted', function () {
            vm.getTData()
        });
        this.$root.$on('submitted', () => {
            // your code goes here
            //vm.getTData()
            //vm.test();
        });
    },
    methods: {

        test: function () {
            alert('I am test from submit')
        },
        getTData() {
            let vm = this;
            vm.rows = [];
            vm.jsonObj = [];

            var str = vm.titles;
            var myarray = str.split(',');
            var mydata = vm.data.split(',');

            for (var i = 0; i < myarray.length; i++) {
                column = {}
                column ["title"] = myarray[i];
                column ["data"] = mydata[i];
                column ["className"] = "left";
                vm.jsonObj.push(column);
            }
            var jsonString = JSON.stringify(vm.jsonObj);
            //alert(jsonString);
            axios.get(vm.url)

                .then(function (response) {

                    //console.log(response.data.data);

                    //let vm = this;
                    let val = response.data.data;
                    var columns = vm.jsonObj;//[{'title':'Name',data: 'name',className: 'center'},{'title':'Email',data: 'email',className: 'center'},{'title':'Phone Number',data: 'phone_number',className: 'center'}];
                    $('#datatable').DataTable({
                        "processing": true,
                        //"serverSide": true,
                        "data": val,
                        columns: columns/*[
                        {'title':'Name',data: "name",
                            className: 'center'
                        },
                        {'title':'Email',data: "email",
                            className: 'center'}
                        ,
                        {'title':'Phone Number',data: "phone_number",
                            className: 'center'}
                    ]*/
                        , bDestroy: true
                    })


                })

                .catch(function (error) {


                });

        }
    }
});

const ctabledata = Vue.component('ctabledata', {
    template: '#ctabledata',
    //props: ['titles','data','url','action','ctitle','btntext'],
    props: {
        titles: {
            default: "",
            type: String
        },
        data: {
            default: "",
            type: String
        },
        url: {
            type: String
        },
        action: {
            default: "",
            type: String
        },
        ctitle: {
            default: "",
            type: String
        },
        btntext: {
            default: "Submit",
            type: String
        },
        akey: {
            default: "id",
            type: String
        },
        submit_btn_visibility: {
            default: "true",
            type: String
        }
    },
    data() {
        //this.ops = '';
        let vm = this;
        return {
            rows: [],
            dtHandle: null
        }
    },
    mounted() {
        let vm = this;
        //var ckey = window;
        this.getTData();
        VEvent.$on('submitted', function () {
            vm.getTData()
        });
        this.$root.$on('submitted', () => {
            // your code goes here
            //vm.getTData()
            //vm.test();
        });
    },
    methods: {

        updateDataTableSelectAllCtrl: function ($table) {
            var $table = this.table.table().node();
            var $chkbox_all = $('tbody input[type="checkbox"]', $table);
            var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
            var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

            // If none of the checkboxes are checked
            if ($chkbox_checked.length === 0) {
                chkbox_select_all.checked = false;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }

                // If all of the checkboxes are checked
            } else if ($chkbox_checked.length === $chkbox_all.length) {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }

                // If some of the checkboxes are checked
            } else {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = true;
                }
            }
        },
        getTData() {

            let vm = this;
            vm.rows = [];
            vm.jsonObj = [];
            vm.columnDefsObj = [];

            var str = vm.titles;
            var myarray = str.split(',');
            var mydata = vm.data.split(',');
            var count = myarray.length;

            vm.count = count;

            for (var i = 0; i < myarray.length; i++) {
                column = {}

                column ["title"] = myarray[i];
                column ["data"] = mydata[i];
                column ["className"] = "left";
                if (myarray[i].match('input') || myarray[i].match('select')) {
                    columnDef = {}
                    columnDef ["targets"] = i;
                    columnDef ["searchable"] = false;
                    columnDef ["orderable"] = false;
                    columnDef ["width"] = "1%";
                    columnDef ["className"] = "dt-body-center";
                    columnDef ["render"] = function (data, type, full, meta) {
                        return '<input type="checkbox">';
                    };//<input name='select_all' value='1' type='checkbox'>
                    column ["title"] = '<input name="select_all" value="1" type="checkbox">';
                    vm.columnDefsObj.push(columnDef);
                }
                vm.jsonObj.push(column);
            }
            var jsonString = JSON.stringify(vm.jsonObj);
            var jsonColsString = JSON.stringify(vm.columnDefsObj);
            var action = vm.action;
            var ctitle = vm.ctitle;
            if (typeof action != 'undefined' || action != null) {

                columnDef = {}
                columnDef ["targets"] = vm.count;
                columnDef ["searchable"] = false;
                columnDef ["orderable"] = false;
                columnDef ["width"] = "30%";
                columnDef ["title"] = ctitle == null ? "" : ctitle;
                columnDef ["render"] = function (data, type, full, meta) {

                    var strArray = action.split('/');
                    var output = '';
                    for (var i = 0; i < strArray.length; i++) {
                        var option = (strArray[i]);
                        switch (option) {
                            case 'Edit':
                                output += '<span class="btn btn-light edit" title="Edit" style="margin-right: 10%;"><i class="zmdi zmdi-edit"></i></span>';
                                break;
                            case 'Delete':
                                output += '<span class="btn btn-light delete" title="Delete" ><i class="zmdi zmdi-delete"></i></span>';
                                break;
                            case 'View':
                                output += '<span class="btn btn-light view" title="View" ><i class="zmdi zmdi-eye"></i></span>';
                                break;
                            case 'Map':
                                output += '<span class="btn btn-light map" title="Map" ><i class="zmdi zmdi-pin"></i></span>';
                                break;
                            default:
                                break;
                        }
                    }
                    return output;
                };//<input name='select_all' value='1' type='checkbox'>
                //column ["title"] = 'Action time';
                vm.columnDefsObj.push(columnDef);
                //vm.jsonObj.push(column);
            }
            axios.get(vm.url)

                .then(function (response) {

                    //console.log(response.data.data);

                    //let vm = this;
                    let val = response.data.data;
                    var avrate = response.data.average;

                    if (avrate > 0) {
                        averagerate = avrate;
                        VEvent.$emit('rated')
                    }
                    var columns = vm.jsonObj;//[{'title':'Name',data: 'name',className: 'center'},{'title':'Email',data: 'email',className: 'center'},{'title':'Phone Number',data: 'phone_number',className: 'center'}];
                    var columnDefs = vm.columnDefsObj
                    var rows_selected = [];
                    vm.table = $('#cdatatable').DataTable({
                        "processing": true,
                        //"serverSide": true,
                        "data": val,
                        columns: columns/*[
                        {'title':'Name',data: "name",
                            className: 'center'
                        },
                        {'title':'Email',data: "email",
                            className: 'center'}
                        ,
                        {'title':'Phone Number',data: "phone_number",
                            className: 'center'}
                    ]*/
                        , bDestroy: true,
                        columnDefs: columnDefs/*[{
                            'targets': 0,
                            'searchable': false,
                            'orderable': false,
                            'width': '1%',
                            'className': 'dt-body-center',
                            'render': function (data, type, full, meta) {
                                return '<input type="checkbox">';
                            }
                        }]*/,
                    });
                    let table = vm.table;

                    // Handle click on checkbox
                    $('#cdatatable tbody').on('click', 'input[type="checkbox"]', function (e) {
                        var $row = $(this).closest('tr');


                        // Get row data
                        var data = table.row($row).data();
                        //alert(eval('data.name'))
                        // Get row ID
                        var rowId = eval('data.' + vm.akey);//data.id; //alert(rowId)
                        //alert(rowId)
                        //var writerId = data.name;


                        // Determine whether row ID is in the list of selected row IDs
                        var index = $.inArray(rowId, rows_selected);

                        // If checkbox is checked and row ID is not in list of selected row IDs
                        if (this.checked && index === -1) {
                            rows_selected.push(rowId);
                            //alert(rowId)

                            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                        } else if (!this.checked && index !== -1) {
                            rows_selected.splice(index, 1);
                        }

                        if (this.checked) {
                            $row.addClass('selected');
                            //alert(rowId)
                            // get users total


                        } else {
                            $row.removeClass('selected');
                            //remove totals text
                            //$('#sum' + writerId + '').text('');
                            //$('.sum').text('');
                        }

                        // Update state of "Select all" control
                        vm.updateDataTableSelectAllCtrl(table);

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle click on table cells with checkboxes
                    $('#cdatatable').on('click', 'tbody td, thead th:first-child', function (e) {
                        $(this).parent().find('input[type="checkbox"]').trigger('click');
                    });

                    //Handle edit
                    $('#cdatatable tbody').on('click', 'td', 'td.edit', function (e) {
                        // to avoid to receive the button click inside the td you need:
                        if ($(e.target).is(':not(td)') && $(e.target).closest('span').hasClass('edit')) {
                            //alert('This is inside td');
                            $('#modal-wizard').modal('show');
                            var $row = $(this).closest('tr');

                            // Get row data
                            var tdata = table.row($row).data();

                            // Get row ID
                            var rowId = tdata.id;
                            //alert(rowId)

                            //$("button[type=submit-update]").parents("form:first").attr("action", " {{ route('branch.update') }}");


                            return;
                        }


                    });

                    //Handle view
                    $('#cdatatable tbody').on('click', 'td', 'td.view', function (e) {
                        // to avoid to receive the button click inside the td you need:
                        if ($(e.target).is(':not(td)') && $(e.target).closest('span').hasClass('view')) {
                            //alert('This is inside td');
                            $('#modal-wizard').modal('show');
                            var $row = $(this).closest('tr');

                            // Get row data
                            var tdata = table.row($row).data();

                            // Get row ID
                            var rowId = tdata.id;
                            //alert(rowId)

                            var email = tdata.slug;
                            var route = $('meta[name="app-url"]').attr('content') + '/admin/profile/' + email;
                            window.location.href = (route)
                            //window.href = route;

                            //$("button[type=submit-update]").parents("form:first").attr("action", " {{ route('branch.update') }}");


                            return;
                        }


                    });

                    //Handle map
                    $('#cdatatable tbody').on('click', 'td', 'td.map', function (e) {
                        // to avoid to receive the button click inside the td you need:
                        if ($(e.target).is(':not(td)') && $(e.target).closest('span').hasClass('map')) {
                            //alert('This is inside td');
                            $('#modal-wizard').modal('show');
                            var $row = $(this).closest('tr');

                            // Get row data
                            var tdata = table.row($row).data();

                            // Get row ID
                            var rowId = tdata.id;
                            //alert(rowId)

                            var lat = tdata.lat;
                            var lng = tdata.lng;
                            var coordinate = lat + "," + lng;
                            $('#map_title').text(tdata.location);
                            // Juja - -1.2795904,36.8238592
                            var src = "https://maps.google.com/maps?q=" + coordinate + "&t=&z=13&ie=UTF8&iwloc=&output=embed&maptype=roadmap";
                            $('#gmap_canvas').attr('src', src);
                            $('#modal-map').modal('show');

                            return;
                        }


                    });


                    //Handle delete
                    $('#cdatatable tbody').on('click', 'td', 'td.delete', function (e) {
                        // to avoid to receive the button click inside the td you need:
                        if ($(e.target).is(':not(td)') && $(e.target).closest('span').hasClass('delete')) {
                            //alert('This is inside td');
                            $('#modal-wizard').modal('show');
                            var $row = $(this).closest('tr');

                            // Get row data
                            var tdata = table.row($row).data();

                            // Get row ID
                            var rowId = tdata.id;
                            alert(rowId)

                            //$("button[type=submit-update]").parents("form:first").attr("action", " {{ route('branch.update') }}");


                            return;
                        }


                    });
                    // Handle click on "Select all" control
                    $('thead input[name="select_all"]', vmtable.table().container()).on('click', function (e) {
                        if (this.checked) {
                            $('#cdatatable tbody input[type="checkbox"]:not(:checked)').trigger('click');
                        } else {
                            $('#cdatatable tbody input[type="checkbox"]:checked').trigger('click');
                        }

                        // Prevent click event from propagating to parent
                        e.stopPropagation();
                    });

                    // Handle table draw event
                    table.on('draw', function () {
                        // Update state of "Select all" control
                        updateDataTableSelectAllCtrl(vm.table);
                    });

                    // Handle form submission event
                    $('button[name="submit"]').click(function (e) {

                        e.preventDefault();
                        var action = $(this).attr('name');
                        var form = jQuery(this).parents("form:first");
                        // Iterate over all selected checkboxes
                        $.each(rows_selected, function (index, rowId) {
                            // Create a hidden element
                            $(form).append(
                                $('<input>')
                                    .attr('type', 'hidden')
                                    .attr('name', 'id[]')
                                    .val(rowId)
                            ).append(
                                $('<input>')
                                    .attr('type', 'hidden')
                                    .attr('name', 'action[]')
                                    .val(action)
                            );
                        });
                        var dataString = form.serialize();
                        var formAction = form.attr('action');

                        $('dynamic-table-console').text($(form).serialize());
                        console.log("Form submission", $(form).serialize());
                        alert(dataString);
                    });
                })

                .catch(function (error) {


                });

        }
    }
});


const vuedatatables0 = Vue.component('vuedatatables', {
    template: '#vuedatatables',
    //props: ['titles','data','url','action','ctitle','btntext'],
    props: {
        titles: {
            default: "",
            type: String
        },
        data: {
            default: "",
            type: String
        },
        url: {
            type: String
        },
        action: {
            default: "",
            type: String
        },
        ctitle: {
            default: "",
            type: String
        },
        btntext: {
            default: "Submit",
            type: String
        },
        akey: {
            default: "id",
            type: String
        },
        has_category: {
            default: "false",
            type: String
        },
        has_image: {
            default: "false",
            type: String
        },
        image_key: {
            default: "",
            type: String
        },
        update_header: {
            default: "Update",
            type: String
        },
        categories: {
            default: "",
            type: String
        },
        submit_btn_visibility: {
            default: "true",
            type: String
        }
    },
    data() {
        //this.ops = '';
        let vm = this;
        return {
            rows: [],
            dtHandle: null
        }
    },
    mounted() {
        let vm = this;
        this.dataTable = null;
        this.selectedRow = null;
        this.persons = [];
        this.init();

    },
    methods: {

        updateDataTableSelectAllCtrl: function ($table) {
            var $table = this.table.table().node();
            var $chkbox_all = $('tbody input[type="checkbox"]', $table);
            var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
            var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

            // If none of the checkboxes are checked
            if ($chkbox_checked.length === 0) {
                chkbox_select_all.checked = false;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }

                // If all of the checkboxes are checked
            } else if ($chkbox_checked.length === $chkbox_all.length) {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }

                // If some of the checkboxes are checked
            } else {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = true;
                }
            }
        },
        init() {

            let vm = this;
            vm.rows = [];
            vm.jsonObj = [];
            vm.columnDefsObj = [];

            var str = vm.titles;
            var myarray = str.split(',');
            var mydata = vm.data.split(',');
            var count = myarray.length;
            vm.title_array = myarray;
            vm.data_array = mydata;

            vm.count = count;


            for (var i = 0; i < myarray.length; i++) {
                if (i == 0) {
                    customColumn = {}
                    customColumn ["class"] = 'details-control';
                    customColumn ["orderable"] = false;
                    customColumn ["data"] = null;
                    customColumn ["defaultContent"] = '';
                    vm.jsonObj.push(customColumn);

                    //myarray[i] = JSON.stringify(customColumn);
                    //alert(JSON.stringify(customColumn))

                    //customColumn = {}
                    /*myarray[i] = {
                        "class":          'details-control',
                        "orderable":      false,
                        "data":           null,
                        "defaultContent": ''
                    };*/
                }
                column = {}

                column ["title"] = myarray[i] === 'details' ? '' : myarray[i];
                column ["data"] = mydata[i];
                //column ["className"] = "left";
                if (myarray[i].match('details') || myarray[i].match('details')) {
                    columnDef = {}
                    columnDef ["class"] = 'details-control';
                    columnDef ["searchable"] = false;
                    columnDef ["orderable"] = false;
                    columnDef ["data"] = null;
                    columnDef ["defaultContent"] = "";
                    columnDef ["targets"] = 0;
                    /*columnDef ["render"] = function (data, type, full, meta) {
                        return '<input type="checkbox">';
                    };*/

                    /*columnDef ["targets"] = i;
                    columnDef ["searchable"] = false;
                    columnDef ["orderable"] = false;
                    columnDef ["width"] = "1%";
                    columnDef ["className"] = "details-control";
                    columnDef ["defaultContent"] = "";
                    columnDef ["render"] = function (data, type, full, meta) {
                        //return '<input type="checkbox">';
                    };*/

                    //<input name='select_all' value='1' type='checkbox'>
                    /*column ["title"] = '<input name="select_all" value="1" type="checkbox">';*/
                    vm.columnDefsObj.push(columnDef);
                }
                vm.jsonObj.push(column);
            }
            var jsonString = JSON.stringify(vm.jsonObj);
            var jsonColsString = JSON.stringify(vm.columnDefsObj);
            var action = vm.action;
            var ctitle = vm.ctitle;
            if (typeof action != 'undefined' || action != null) {

                columnDef = {}
                columnDef ["targets"] = vm.count + 1;
                columnDef ["searchable"] = false;
                columnDef ["orderable"] = false;
                columnDef ["width"] = "30%";
                columnDef ["title"] = ctitle == null ? "" : ctitle;
                columnDef ["render"] = function (data, type, full, meta) {

                    var strArray = action.split('/');
                    var output = '';
                    for (var i = 0; i < strArray.length; i++) {
                        var option = (strArray[i]);
                        switch (option) {
                            case 'Edit':
                                output += '<span class="btn btn-light edit" title="Edit" style="margin-right: 10%;"><i class="zmdi zmdi-edit"></i></span>';
                                break;
                            case 'Delete':
                                output += '<strong><i class="hand-cursor fa fa-lg fa-trash-o deleteGoal" title="Delete"></i><strong>';
                                break;
                            case 'View':
                                output += '<span class="btn btn-light view" title="View" ><i class="zmdi zmdi-eye"></i></span>';
                                break;
                            case 'Map':
                                output += '<span class="btn btn-light map" title="Map" ><i class="zmdi zmdi-pin"></i></span>';
                                break;
                            default:
                                break;
                        }
                    }
                    return output;
                };//<input name='select_all' value='1' type='checkbox'>
                //column ["title"] = 'Action time';
                vm.columnDefsObj.push(columnDef);
                //vm.jsonObj.push(column);
            }
            axios.get(vm.url)

                .then(function (response) {

                    //console.log(response.data.data);

                    //let vm = this;
                    let val = response.data.data;
                    var avrate = response.data.average;

                    if (avrate > 0) {
                        averagerate = avrate;
                        VEvent.$emit('rated')
                    }
                    var columns = vm.jsonObj;//[{'title':'Name',data: 'name',className: 'center'},{'title':'Email',data: 'email',className: 'center'},{'title':'Phone Number',data: 'phone_number',className: 'center'}];
                    var columnDefs = vm.columnDefsObj
                    var rows_selected = [];
                    //alert(JSON.stringify(columns))
                    Vue.nextTick(function () {
                        vm.dataTable = $('#dynamic-table').DataTable({
                            "processing": true,
                            //"serverSide": true,
                            "data": val,
                            columns: columns/*[
                            {
                                "class":          'details-control',
                                "orderable":      false,
                                "data":           null,
                                "defaultContent": ''
                            },
                            {data: "idea_title"},
                            {data: "description"},
                            {data: "country"},
                            {data: "id","className":"center",
                                'render': function (data, type, row, meta) {
                                    return '<strong><i class="hand-cursor fa fa-lg fa-trash-o deleteGoal" id="deleteGoal' + row.id + '" title="Delete Goal"></i><strong>';
                                }}

                        ]*/
                            , bDestroy: true,
                            columnDefs: columnDefs/*[{
                            'targets': 0,
                            'searchable': false,
                            'orderable': false,
                            'width': '1%',
                            'className': 'dt-body-center',
                            'render': function (data, type, full, meta) {
                                return '<input type="checkbox">';
                            }
                        }]*/,
                            initComplete: function () {
                                $('.dataTables_filter input[type="search"]').css({
                                    'width': '350px',
                                    'display': 'inline-block',
                                    "position": "relative",
                                    "right": "-50px",
                                    "margin-top": "1em"
                                })
                                    .attr('placeholder', 'Search here ...');
                            },
                            "lengthChange": false,
                            "language": {
                                "search": "",
                                "zeroRecords": "No Records Found",
                                "info": "", /*/!*Total*!/*/
                                "infoEmpty": ""/*/!*No records available*!/*/
                                /*/!*,"infoFiltered": "(filtered from _MAX_ total records)"/!**!/*/
                            }
                        });

                        $('#dynamic-table').css('font-size', "0.75em");
                        $('.panel-default').css('font-size', "0.75em");
                        $('#dynamic-table').css({paddingLeft: '0.5em'});

                        $('#dynamic-table tbody').on('click', 'td.details-control', function (e) {
                            let tr = $(this).closest('tr');
                            var row = vm.dataTable.row(tr);
                            vm.selectedRow = row;

                            if (row.child.isShown()) {
                                // This row is already open - close it
                                row.child.hide();
                                tr.removeClass('shown');
                            }
                            else {
                                // Open this row
                                row.child(vm.format(row.data())).show();
                                tr.addClass('shown');

                            }

                        });

                        $('#dynamic-table tbody').on('click', 'td.center', function (e) {

                            // handle deletes
                            if ($(e.target).is(':not(td)') && $(e.target).closest('i').hasClass('deleteGoal')) {
                                let tr = $(this).closest('tr');
                                var row = self.dataTable.row(tr);
                                var id = row.data().id;

                                swal({
                                    title: '<strong style="color: #ffffff">Are you sure?</strong>',
                                    html: '<strong style="color: #ffffff">You will not recover this goal</strong>',
                                    type: 'warning',
                                    showCancelButton: true,
                                    buttonsStyling: false,
                                    confirmButtonClass: 'btn btn-danger',
                                    confirmButtonText: 'Yes, delete it!',
                                    cancelButtonClass: 'btn btn-light',
                                    background: 'rgba(0,0,0,.5)'
                                }).then(function () {
                                    var postURL = $('meta[name="app-url"]').attr('content') + '/deleteidea';
                                    axios.post(postURL, {
                                        "id": id
                                    })

                                        .then(function (response) {

                                            //vm.output = response.data;
                                            var results = response.data.data;
                                            if (results.success) {

                                                toastr.success(results.message)
                                                toastr.options.timeOut = 3000; // 3s

                                                var post = results.goals;

                                                //update selected row ...
                                                //self.selectedRow.data(post).invalidate().draw()

                                                //redraw the table ...
                                                self.dataTable.clear().draw(); // clear data
                                                self.dataTable.rows.add(post); // Add new data
                                                self.dataTable.columns.adjust().draw(); // Redraw the DataTable

                                                //update tab count
                                                var rowCount = self.dataTable.page.info().recordsTotal;
                                                $("span[id=friends]").text('My Goals (' + rowCount + ')');


                                            }


                                        })

                                        .catch(function (error) {
                                            console.log(error);
                                            //post_response= error;

                                        });

                                    swal({
                                        title: '<strong style="color: #ffffff">Done!</strong>',
                                        html: '<strong style="color: #ffffff">You will not recover this goal</strong>',
                                        type: 'success',
                                        buttonsStyling: false,
                                        confirmButtonClass: 'btn btn-light',
                                        background: 'rgba(0,0,0,.5)'
                                    });
                                });
                            }
                        })

                        jQuery(document).on('click', '.update-goal', function () {
                            let form = $(this).parents("form:first");
                            var postURL = form.attr('action');
                            var input = form.serialize();
                            axios.post(postURL, input, config)

                                .then(function (response) {

                                    //vm.output = response.data;
                                    var results = response.data.data;
                                    if (results.success) {

                                        toastr.success(results.message)
                                        toastr.options.timeOut = 3000; // 3s

                                        var post = results.post;
                                        var title = post.title;
                                        var description = post.description;
                                        form.find('input[name=idea_title]').attr('placeholder', title)
                                        form.find('textarea[name=description]').attr('placeholder', description);
                                        //update selected row ...
                                        vm.selectedRow.data(post).invalidate().draw()

                                    }

                                    form.trigger('reset');


                                })

                                .catch(function (error) {
                                    console.log(error);
                                    //post_response= error;

                                });
                        });

                        jQuery(document).on('click', '.cancel-update-goal', function () {

                            var form = $(this).parents("form:first");
                            form.trigger('reset');
                        })
                    });

                })

                .catch(function (error) {


                });

        },
        format: function (d, data_array) {
            let vm = this;
            var data_array = vm.data_array;
            var title_array = vm.title_array;
            //alert(JSON.stringify(d[1]))
            // `d` is the original data object for the row
            var child_row = '';
            if (title_array.length = data_array.length) {
                var form = '<form id="form_update_goal" action="' + $('meta[name="app-url"]').attr('content') + '/updateidea" method="post" role="form"' +
                    '      class="form-horizontal">' +
                    '        <div class="form-group">';
                var html = '';
                for (var i = 0; i < title_array.length; i++) {
                    //var rowId = eval('data.'+vm.akey);
                    //alert(data_array[i])
                    //alert(eval('d.'+data_array[i]))

                    if (title_array[i] === eval('d.' + title_array[i])) {
                        //alert(eval('d.'+data_array[i]))
                    }
                    var image_picker = '';
                    if (vm.has_image === 'true') {
                        image_picker += '<input name="all_files" id="all_files" type="hidden">';
                        image_picker += '                <span folder="directory" value="uploads/avatars" class="hidden"></span> <input' +
                            '                        value="' + $("meta[name='csrf-token']").attr('content') + '" name="_token" type="hidden">' +
                            '                <div><input accept="image/*" id="file-input" multiple="multiple" style="margin-top: 1em;" type="file">' +
                            '                </div>';

                    }
                    html += data_array[i] === 'description' ? ('        <div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">' + title_array[i] + '</label>' +
                        '            <div class="col-sm-10"> <textarea name="' + data_array[i] + '"' +
                        '                                                                                                   id="' + data_array[i] + '"' +
                        '                                                                                                   placeholder="' + eval('d.' + data_array[i]) + '"' +
                        '                                                                                                   class="form-control"></textarea>' +
                        '' + image_picker + '' +
                        '            </div>' +
                        '        </div>') : data_array[i] === 'country' ? '<div class="form-group"><label for="country" class="col-sm-2 control-label">Country</label>' +
                        '                <div class="col-md-10"><select size="0" name="country" id="country"' +
                        '                                               class="form-control col-lg-12 col-md-12 col-sm-4 col-xs-12">' +
                        '                        <option value="Kenya" selected="selected">Kenya</option>' +
                        '                        <option value="United States">United States</option>' +
                        '                        <option value="United Kingdom">United Kingdom</option>' +
                        '                        <option value="Afghanistan">Afghanistan</option>' +
                        '                        <option value="Albania">Albania</option>' +
                        '                        <option value="Algeria">Algeria</option>' +
                        '                        <option value="American Samoa">American Samoa</option>' +
                        '                        <option value="Andorra">Andorra</option>' +
                        '                        <option value="Angola">Angola</option>' +
                        '                        <option value="Anguilla">Anguilla</option>' +
                        '                        <option value="Antarctica">Antarctica</option>' +
                        '                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>' +
                        '                        <option value="Argentina">Argentina</option>' +
                        '                        <option value="Armenia">Armenia</option>' +
                        '                        <option value="Aruba">Aruba</option>' +
                        '                        <option value="Australia">Australia</option>' +
                        '                        <option value="Austria">Austria</option>' +
                        '                        <option value="Azerbaijan">Azerbaijan</option>' +
                        '                        <option value="Bahamas">Bahamas</option>' +
                        '                        <option value="Bahrain">Bahrain</option>' +
                        '                        <option value="Bangladesh">Bangladesh</option>' +
                        '                        <option value="Barbados">Barbados</option>' +
                        '                        <option value="Belarus">Belarus</option>' +
                        '                        <option value="Belgium">Belgium</option>' +
                        '                        <option value="Belize">Belize</option>' +
                        '                        <option value="Benin">Benin</option>' +
                        '                        <option value="Bermuda">Bermuda</option>' +
                        '                        <option value="Bhutan">Bhutan</option>' +
                        '                        <option value="Bolivia">Bolivia</option>' +
                        '                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>' +
                        '                        <option value="Botswana">Botswana</option>' +
                        '                        <option value="Bouvet Island">Bouvet Island</option>' +
                        '                        <option value="Brazil">Brazil</option>' +
                        '                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>' +
                        '                        <option value="Brunei Darussalam">Brunei Darussalam</option>' +
                        '                        <option value="Bulgaria">Bulgaria</option>' +
                        '                        <option value="Burkina Faso">Burkina Faso</option>' +
                        '                        <option value="Burundi">Burundi</option>' +
                        '                        <option value="Cambodia">Cambodia</option>' +
                        '                        <option value="Cameroon">Cameroon</option>' +
                        '                        <option value="Canada">Canada</option>' +
                        '                        <option value="Cape Verde">Cape Verde</option>' +
                        '                        <option value="Cayman Islands">Cayman Islands</option>' +
                        '                        <option value="Central African Republic">Central African Republic</option>' +
                        '                        <option value="Chad">Chad</option>' +
                        '                        <option value="Chile">Chile</option>' +
                        '                        <option value="China">China</option>' +
                        '                        <option value="Christmas Island">Christmas Island</option>' +
                        '                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>' +
                        '                        <option value="Colombia">Colombia</option>' +
                        '                        <option value="Comoros">Comoros</option>' +
                        '                        <option value="Congo">Congo</option>' +
                        '                        <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The' +
                        '                        </option>' +
                        '                        <option value="Cook Islands">Cook Islands</option>' +
                        '                        <option value="Costa Rica">Costa Rica</option>' +
                        '                        <option value="Cote D\'ivoire">Cote D\'ivoire</option>' +
                        '                        <option value="Croatia">Croatia</option>' +
                        '                        <option value="Cuba">Cuba</option>' +
                        '                        <option value="Cyprus">Cyprus</option>' +
                        '                        <option value="Czech Republic">Czech Republic</option>' +
                        '                        <option value="Denmark">Denmark</option>' +
                        '                        <option value="Djibouti">Djibouti</option>' +
                        '                        <option value="Dominica">Dominica</option>' +
                        '                        <option value="Dominican Republic">Dominican Republic</option>' +
                        '                        <option value="Ecuador">Ecuador</option>' +
                        '                        <option value="Egypt">Egypt</option>' +
                        '                        <option value="El Salvador">El Salvador</option>' +
                        '                        <option value="Equatorial Guinea">Equatorial Guinea</option>' +
                        '                        <option value="Eritrea">Eritrea</option>' +
                        '                        <option value="Estonia">Estonia</option>' +
                        '                        <option value="Ethiopia">Ethiopia</option>' +
                        '                        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>' +
                        '                        <option value="Faroe Islands">Faroe Islands</option>' +
                        '                        <option value="Fiji">Fiji</option>' +
                        '                        <option value="Finland">Finland</option>' +
                        '                        <option value="France">France</option>' +
                        '                        <option value="French Guiana">French Guiana</option>' +
                        '                        <option value="French Polynesia">French Polynesia</option>' +
                        '                        <option value="French Southern Territories">French Southern Territories</option>' +
                        '                        <option value="Gabon">Gabon</option>' +
                        '                        <option value="Gambia">Gambia</option>' +
                        '                        <option value="Georgia">Georgia</option>' +
                        '                        <option value="Germany">Germany</option>' +
                        '                        <option value="Ghana">Ghana</option>' +
                        '                        <option value="Gibraltar">Gibraltar</option>' +
                        '                        <option value="Greece">Greece</option>' +
                        '                        <option value="Greenland">Greenland</option>' +
                        '                        <option value="Grenada">Grenada</option>' +
                        '                        <option value="Guadeloupe">Guadeloupe</option>' +
                        '                        <option value="Guam">Guam</option>' +
                        '                        <option value="Guatemala">Guatemala</option>' +
                        '                        <option value="Guinea">Guinea</option>' +
                        '                        <option value="Guinea-bissau">Guinea-bissau</option>' +
                        '                        <option value="Guyana">Guyana</option>' +
                        '                        <option value="Haiti">Haiti</option>' +
                        '                        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>' +
                        '                        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>' +
                        '                        <option value="Honduras">Honduras</option>' +
                        '                        <option value="Hong Kong">Hong Kong</option>' +
                        '                        <option value="Hungary">Hungary</option>' +
                        '                        <option value="Iceland">Iceland</option>' +
                        '                        <option value="India">India</option>' +
                        '                        <option value="Indonesia">Indonesia</option>' +
                        '                        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>' +
                        '                        <option value="Iraq">Iraq</option>' +
                        '                        <option value="Ireland">Ireland</option>' +
                        '                        <option value="Israel">Israel</option>' +
                        '                        <option value="Italy">Italy</option>' +
                        '                        <option value="Jamaica">Jamaica</option>' +
                        '                        <option value="Japan">Japan</option>' +
                        '                        <option value="Jordan">Jordan</option>' +
                        '                        <option value="Kazakhstan">Kazakhstan</option>' +
                        '                        <option value="Kenya">Kenya</option>' +
                        '                        <option value="Kiribati">Kiribati</option>' +
                        '                        <option value="Korea, Democratic People\'s Republic of">Korea, Democratic People\'s Republic of' +
                        '                        </option>' +
                        '                        <option value="Korea, Republic of">Korea, Republic of</option>' +
                        '                        <option value="Kuwait">Kuwait</option>' +
                        '                        <option value="Kyrgyzstan">Kyrgyzstan</option>' +
                        '                        <option value="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option>' +
                        '                        <option value="Latvia">Latvia</option>' +
                        '                        <option value="Lebanon">Lebanon</option>' +
                        '                        <option value="Lesotho">Lesotho</option>' +
                        '                        <option value="Liberia">Liberia</option>' +
                        '                        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>' +
                        '                        <option value="Liechtenstein">Liechtenstein</option>' +
                        '                        <option value="Lithuania">Lithuania</option>' +
                        '                        <option value="Luxembourg">Luxembourg</option>' +
                        '                        <option value="Macao">Macao</option>' +
                        '                        <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav' +
                        '                            Republic of' +
                        '                        </option>' +
                        '                        <option value="Madagascar">Madagascar</option>' +
                        '                        <option value="Malawi">Malawi</option>' +
                        '                        <option value="Malaysia">Malaysia</option>' +
                        '                        <option value="Maldives">Maldives</option>' +
                        '                        <option value="Mali">Mali</option>' +
                        '                        <option value="Malta">Malta</option>' +
                        '                        <option value="Marshall Islands">Marshall Islands</option>' +
                        '                        <option value="Martinique">Martinique</option>' +
                        '                        <option value="Mauritania">Mauritania</option>' +
                        '                        <option value="Mauritius">Mauritius</option>' +
                        '                        <option value="Mayotte">Mayotte</option>' +
                        '                        <option value="Mexico">Mexico</option>' +
                        '                        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>' +
                        '                        <option value="Moldova, Republic of">Moldova, Republic of</option>' +
                        '                        <option value="Monaco">Monaco</option>' +
                        '                        <option value="Mongolia">Mongolia</option>' +
                        '                        <option value="Montserrat">Montserrat</option>' +
                        '                        <option value="Morocco">Morocco</option>' +
                        '                        <option value="Mozambique">Mozambique</option>' +
                        '                        <option value="Myanmar">Myanmar</option>' +
                        '                        <option value="Namibia">Namibia</option>' +
                        '                        <option value="Nauru">Nauru</option>' +
                        '                        <option value="Nepal">Nepal</option>' +
                        '                        <option value="Netherlands">Netherlands</option>' +
                        '                        <option value="Netherlands Antilles">Netherlands Antilles</option>' +
                        '                        <option value="New Caledonia">New Caledonia</option>' +
                        '                        <option value="New Zealand">New Zealand</option>' +
                        '                        <option value="Nicaragua">Nicaragua</option>' +
                        '                        <option value="Niger">Niger</option>' +
                        '                        <option value="Nigeria">Nigeria</option>' +
                        '                        <option value="Niue">Niue</option>' +
                        '                        <option value="Norfolk Island">Norfolk Island</option>' +
                        '                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>' +
                        '                        <option value="Norway">Norway</option>' +
                        '                        <option value="Oman">Oman</option>' +
                        '                        <option value="Pakistan">Pakistan</option>' +
                        '                        <option value="Palau">Palau</option>' +
                        '                        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>' +
                        '                        <option value="Panama">Panama</option>' +
                        '                        <option value="Papua New Guinea">Papua New Guinea</option>' +
                        '                        <option value="Paraguay">Paraguay</option>' +
                        '                        <option value="Peru">Peru</option>' +
                        '                        <option value="Philippines">Philippines</option>' +
                        '                        <option value="Pitcairn">Pitcairn</option>' +
                        '                        <option value="Poland">Poland</option>' +
                        '                        <option value="Portugal">Portugal</option>' +
                        '                        <option value="Puerto Rico">Puerto Rico</option>' +
                        '                        <option value="Qatar">Qatar</option>' +
                        '                        <option value="Reunion">Reunion</option>' +
                        '                        <option value="Romania">Romania</option>' +
                        '                        <option value="Russian Federation">Russian Federation</option>' +
                        '                        <option value="Rwanda">Rwanda</option>' +
                        '                        <option value="Saint Helena">Saint Helena</option>' +
                        '                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>' +
                        '                        <option value="Saint Lucia">Saint Lucia</option>' +
                        '                        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>' +
                        '                        <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>' +
                        '                        <option value="Samoa">Samoa</option>' +
                        '                        <option value="San Marino">San Marino</option>' +
                        '                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>' +
                        '                        <option value="Saudi Arabia">Saudi Arabia</option>' +
                        '                        <option value="Senegal">Senegal</option>' +
                        '                        <option value="Serbia and Montenegro">Serbia and Montenegro</option>' +
                        '                        <option value="Seychelles">Seychelles</option>' +
                        '                        <option value="Sierra Leone">Sierra Leone</option>' +
                        '                        <option value="Singapore">Singapore</option>' +
                        '                        <option value="Slovakia">Slovakia</option>' +
                        '                        <option value="Slovenia">Slovenia</option>' +
                        '                        <option value="Solomon Islands">Solomon Islands</option>' +
                        '                        <option value="Somalia">Somalia</option>' +
                        '                        <option value="South Africa">South Africa</option>' +
                        '                        <option value="South Georgia and The South Sandwich Islands">South Georgia and The South' +
                        '                            Sandwich Islands' +
                        '                        </option>' +
                        '                        <option value="Spain">Spain</option>' +
                        '                        <option value="Sri Lanka">Sri Lanka</option>' +
                        '                        <option value="Sudan">Sudan</option>' +
                        '                        <option value="Suriname">Suriname</option>' +
                        '                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>' +
                        '                        <option value="Swaziland">Swaziland</option>' +
                        '                        <option value="Sweden">Sweden</option>' +
                        '                        <option value="Switzerland">Switzerland</option>' +
                        '                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>' +
                        '                        <option value="Taiwan, Province of China">Taiwan, Province of China</option>' +
                        '                        <option value="Tajikistan">Tajikistan</option>' +
                        '                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>' +
                        '                        <option value="Thailand">Thailand</option>' +
                        '                        <option value="Timor-leste">Timor-leste</option>' +
                        '                        <option value="Togo">Togo</option>' +
                        '                        <option value="Tokelau">Tokelau</option>' +
                        '                        <option value="Tonga">Tonga</option>' +
                        '                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>' +
                        '                        <option value="Tunisia">Tunisia</option>' +
                        '                        <option value="Turkey">Turkey</option>' +
                        '                        <option value="Turkmenistan">Turkmenistan</option>' +
                        '                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>' +
                        '                        <option value="Tuvalu">Tuvalu</option>' +
                        '                        <option value="Uganda">Uganda</option>' +
                        '                        <option value="Ukraine">Ukraine</option>' +
                        '                        <option value="United Arab Emirates">United Arab Emirates</option>' +
                        '                        <option value="United Kingdom">United Kingdom</option>' +
                        '                        <option value="United States">United States</option>' +
                        '                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands' +
                        '                        </option>' +
                        '                        <option value="Uruguay">Uruguay</option>' +
                        '                        <option value="Uzbekistan">Uzbekistan</option>' +
                        '                        <option value="Vanuatu">Vanuatu</option>' +
                        '                        <option value="Venezuela">Venezuela</option>' +
                        '                        <option value="Viet Nam">Viet Nam</option>' +
                        '                        <option value="Virgin Islands, British">Virgin Islands, British</option>' +
                        '                        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>' +
                        '                        <option value="Wallis and Futuna">Wallis and Futuna</option>' +
                        '                        <option value="Western Sahara">Western Sahara</option>' +
                        '                        <option value="Yemen">Yemen</option>' +
                        '                        <option value="Zambia">Zambia</option>' +
                        '                        <option value="Zimbabwe">Zimbabwe</option>' +
                        '                    </select></div>' +
                        '            </div>' : '<div class="form-group">' +
                        '            <label for="inputEmail3" class="col-sm-2 control-label">' + title_array[i] + '</label>' +
                        '            <div class="col-sm-10">' +
                        '           <input name="' + data_array[i] + '" id="' + data_array[i] + '" value="' + eval('d.' + data_array[i]) + '"' +
                        '                                          class="form-control" type="hidden">' +
                        '           <input name="' + data_array[i] + '" id="' + data_array[i] + '" placeholder="' + eval('d.' + data_array[i]) + '"' +
                        '                                          class="form-control" type="text">' +
                        '           </div></div>'
                    ;
                }
                if (vm.has_category === 'true') {
                    /*html+='<div class="form-group"><label for="country" class="col-sm-2 control-label">Category</label>' +
                        '                <div class="col-md-10"><select size="0" name="category" id="category"' +
                        '                                               class="form-control col-lg-12 col-md-12 col-sm-4 col-xs-12">' +
                        '                        <option>Category</option>' +
                        '                        <option value="1">New</option>' +
                        '                        <option value="2">Entertainment</option>' +
                        '                        <option value="3">New Skill</option>' +
                        '                        <option value="4">Adventure</option>' +
                        '                        <option value="5">Sporting</option>' +
                        '                        <option value="6">Marine</option>' +
                        '                        <option value="7">Nature</option>' +
                        '                    </select></div>' +
                        '            </div>';*/
                    var category_div = '<div class="form-group"><label for="country" class="col-sm-2 control-label">Category</label>' +
                        '                <div class="col-md-10">';
                    var select = '<select size="0" name="category" id="category"' +
                        '                                               class="form-control col-lg-12 col-md-12 col-sm-4 col-xs-12">';
                    var option = '<option>Category</option>';
                    var str_categories = vm.categories;
                    var categories_array = str_categories.split(',');
                    for (var i = 0; i < categories_array.length; i++) {
                        option += '<option value="' + i + '">' + categories_array[i] + '</option>';
                    }
                    select += option + '</select>';
                    category_div += select;
                    category_div += '</div></div>';
                    html += category_div;
                }
                var child_div = '';
                var image_div = '';
                var col_sm = 'col-sm-12';
                if (vm.has_image === 'true') {
                    image_div += '    <div class="col-xs-12 col-sm-3">' +
                        '        <div class="text-center">' +
                        '           <img class="thumbnail inline no-margin-bottom" alt="Domain Owner\'s Avatar"' +
                        '                                      src="' + $('meta[name="app-url"]').attr('content') + '/uploads/avatars/' + eval('d.' + vm.image_key) + '" height="100">' +
                        '           <span class="white">' + eval('d.' + data_array[0]) + '</span>' +

                        '        </div>' +
                        '    </div>';
                    col_sm = 'col-sm-9';
                }
                //alert(category_div);
                child_div += '<div class="table-detail">';
                child_div += '<div class="row">';
                child_div += image_div;
                child_div += '    <div class="col-xs-12 ' + col_sm + '">' +
                    '        <div class="space visible-xs"></div>' +

                    '        <div class="space-6">' +
                    '<h4 class="header blue lighter less-margin center" style="margin-left: 50%;">' + vm.update_header + '</h4>' +
                    '</div>';
                var form = '<form id="form_update_goal" action="' + $('meta[name="app-url"]').attr('content') + '/updateidea" method="post" role="form"' +
                    '      class="form-horizontal">' +
                    '        <div class="form-group">';
                var form_buttons = '<div class="form-group" style="float: right">' +
                    '                <button type="button" class="btn btn-success update-goal" style="cursor: pointer;"><i class="glyphicon "></i>&nbsp;Update' +
                    '                </button>' +
                    '                <button type="button" class="btn btn-danger cancel-update-goal" style="cursor: pointer;"><i class="glyphicon "></i>&nbsp;Cancel' +
                    '                </button>' +
                    '            </div>';
                form += html;
                form += form_buttons
                form += '</form>';
                child_div += form;

                child_row = child_div

            }


            return child_row;
        }
    }
});

/*
* ==================================
*             Chats
* ==================================
*
* */
const messages = Vue.component('messages', httpVueLoader(domain + 'js/vue/components/MessagesComponent.vue'));
const submit = Vue.component('submit', httpVueLoader(domain + 'js/vue/components/SubmitComponent.vue'));
const vuetable = Vue.component('vuetable', httpVueLoader(domain + 'js/vue/components/VueTableComponent.vue'));
const vuectable = Vue.component('vuectable', httpVueLoader(domain + 'js/vue/components/VueCDataTableComponent.vue'));

const vuecommontable = Vue.component('vuecommontable', httpVueLoader(domain + 'js/vue/components/VueCommonTableComponent.vue'));
const upload = Vue.component('upload', httpVueLoader(domain + 'js/vue/components/UploadComponent.vue'));
const avatar = Vue.component('avatar', httpVueLoader(domain + 'js/vue/components/AvatarComponent.vue'));

const app = new Vue({
    el: '#app',
    components: {
        upload, /*submit,*/

    },
    data: {
        //isFirstDataLoaded: false,
        //persons:() => [],
        message: 'My first VueJS Task'
    }, methods: {

        /*init: function() {
            var self = this;
            let url = $('#dynamic-table').attr('url');
            //alert(url)
            // using axios to get data from server
            axios.get(url).then(function(response) {
                self.isFirstDataLoaded = true;
                if ( (response) ) {
                    self.persons = (response.data.data);
                    let val = response.data.data;

                    Vue.nextTick(function() {
                        // save a reference to the DataTable
                        self.dataTable = $('#dynamic-table').DataTable({
                            "processing": true,
                            //"serverSide": true,
                            "data": val,
                            columns: [
                                {
                                    "class":          'details-control',
                                    "orderable":      false,
                                    "data":           null,
                                    "defaultContent": ''
                                },
                                {data: "idea_title"},
                                {data: "description"},
                                {data: "country"},
                                {data: "id","className":"center",
                                    'render': function (data, type, row, meta) {
                                        return '<strong><i class="hand-cursor fa fa-lg fa-trash-o deleteGoal" id="deleteGoal' + row.id + '" title="Delete Goal"></i><strong>';
                                    }}

                            ],
                            bDestroy: true,
                            columnDefs:[{
                            'targets': 0,
                            'searchable': false,
                            'orderable': false,
                            'width': '1%',
                            'className': 'details-control'
                        }],
                            initComplete: function () {
                                $('.dataTables_filter input[type="search"]').css({ 'width': '350px', 'display': 'inline-block', "position":"relative","right":"-50px","margin-top":"1em"})
                                    .attr('placeholder','Search here ...');
                            },
                            "lengthChange": false,
                            "language": {
                                "search": "",
                                "zeroRecords": "No Records Found",
                                "info": "", /!*Total*!/
                                "infoEmpty": ""/!*No records available*!/
                                /!*,"infoFiltered": "(filtered from _MAX_ total records)"/!**!/
                            }
                            // etc
                        });
                        $('#dynamic-table').css('font-size', "0.75em");
                        $('.panel-default').css('font-size', "0.75em");
                        $('#dynamic-table').css({paddingLeft: '0.5em'});

                        $('#dynamic-table tbody').on('click', 'td.details-control', function (e) {
                            let tr = $(this).closest('tr');
                            var row = self.dataTable.row( tr );
                            self.selectedRow = row;

                            if ( row.child.isShown() ) {
                                // This row is already open - close it
                                row.child.hide();
                                tr.removeClass('shown');
                            }
                            else {
                                // Open this row
                                row.child( self.format(row.data()) ).show();
                                tr.addClass('shown');
                            }

                        });

                        $('#dynamic-table tbody').on('click', 'td.center', function (e) {

                            // handle deletes
                            if ($(e.target).is(':not(td)') && $(e.target).closest('i').hasClass('deleteGoal')) {
                                let tr = $(this).closest('tr');
                                var row = self.dataTable.row( tr );
                                var id = row.data().id;

                                swal({
                                    title: '<strong style="color: #ffffff">Are you sure?</strong>',
                                    html: '<strong style="color: #ffffff">You will not recover this goal</strong>',
                                    type: 'warning',
                                    showCancelButton: true,
                                    buttonsStyling: false,
                                    confirmButtonClass: 'btn btn-danger',
                                    confirmButtonText: 'Yes, delete it!',
                                    cancelButtonClass: 'btn btn-light',
                                    background: 'rgba(0,0,0,.5)'
                                }).then(function(){
                                    var postURL = $('meta[name="app-url"]').attr('content') + '/deleteidea';
                                    axios.post(postURL, {
                                        "id":id
                                    })

                                        .then(function (response) {

                                            //vm.output = response.data;
                                            var results = response.data.data;
                                            if(results.success){

                                                toastr.success(results.message)
                                                toastr.options.timeOut = 3000; // 3s

                                                var post = results.goals;

                                                //update selected row ...
                                                //self.selectedRow.data(post).invalidate().draw()

                                                //redraw the table ...
                                                self.dataTable.clear().draw(); // clear data
                                                self.dataTable.rows.add(post); // Add new data
                                                self.dataTable.columns.adjust().draw(); // Redraw the DataTable

                                                //update tab count
                                                var rowCount = self.dataTable.page.info().recordsTotal;
                                                $("span[id=friends]").text('My Goals ('+rowCount+')');


                                            }







                                        })

                                        .catch(function (error) {
                                            console.log(error);
                                            //post_response= error;

                                        });

                                    swal({
                                        title: '<strong style="color: #ffffff">Done!</strong>',
                                        html: '<strong style="color: #ffffff">You will not recover this goal</strong>',
                                        type: 'success',
                                        buttonsStyling: false,
                                        confirmButtonClass: 'btn btn-light',
                                        background: 'rgba(0,0,0,.5)'
                                    });
                                });
                            }
                        })

                        jQuery(document).on('click','.update-goal',function(){
                            let form = $(this).parents("form:first");
                            var postURL = form.attr('action');
                            var input = form.serialize();
                            axios.post(postURL, input,config)

                                .then(function (response) {

                                    //vm.output = response.data;
                                    var results = response.data.data;
                                    if(results.success){

                                        toastr.success(results.message)
                                        toastr.options.timeOut = 3000; // 3s

                                        var post = results.post;
                                        var title = post.title;
                                        var description = post.description;
                                        form.find('input[name=idea_title]').attr('placeholder',title)
                                        form.find('textarea[name=description]').attr('placeholder',description);
                                        //update selected row ...
                                        self.selectedRow.data(post).invalidate().draw()

                                    }

                                    form.trigger('reset');





                                })

                                .catch(function (error) {
                                    console.log(error);
                                    //post_response= error;

                                });
                        });

                        jQuery(document).on('click','.cancel-update-goal',function(){

                            var form = $(this).parents("form:first");
                            form.trigger('reset');
                        })
                    });
                }
                else {
                    console.log(response);
                }
            }).catch(function(error) {
                // showWarning(error);
                console.log(error)
            });
        },
        format:function(d) {
            //alert(JSON.stringify(d[1]))
            // `d` is the original data object for the row
            var output = '<div class="table-detail">'+
                '<div class="row">'+
                '    <div class="col-xs-12 col-sm-3">'+
                '        <div class="text-center">' +
                '           <img class="thumbnail inline no-margin-bottom" alt="Domain Owner\'s Avatar"'+
                '                                      src="'+$('meta[name="app-url"]').attr('content')+'/uploads/avatars/'+d.idea_image+'" height="100">' +
                '           <span class="white">'+d.idea_title+'</span>'+

                '        </div>'+
                '    </div>'+
                '    <div class="col-xs-12 col-sm-9">'+
                '        <div class="space visible-xs"></div>'+

                '        <div class="space-6">' +
                '<h4 class="header blue lighter less-margin center" style="margin-left: 50%;">Update Goal</h4>'+
                '</div>'+
                '<form id="form_update_goal" action="'+$('meta[name="app-url"]').attr('content')+'/updateidea" method="post" role="form"'+
                '      class="form-horizontal">'+
                '        <div class="form-group">'+
                '            <label for="inputEmail3" class="col-sm-2 control-label">Title</label>'+
                '            <div class="col-sm-10">' +
                '           <input name="id" id="id" value="'+d.id+'"'+
                '                                          class="form-control" type="hidden">' +
                '           <input name="idea_title" id="idea_title" placeholder="'+d.idea_title+'"'+
                '                                          class="form-control" type="text">' +
                '           </div>'+
                '        </div>'+
                '        <div class="form-group"><label for="country" class="col-sm-2 control-label">Country</label>'+
                '            <div class="col-md-10"><select size="0" name="country" id="country"'+
                '                                           class="form-control col-lg-12 col-md-12 col-sm-4 col-xs-12">'+
                '                    <option value="'+d.country+'" selected="selected">'+d.country+'</option>'+
                '                    <option value="United States">United States</option>'+
                '                    <option value="United Kingdom">United Kingdom</option>'+
                '                    <option value="Afghanistan">Afghanistan</option>'+
                '                    <option value="Albania">Albania</option>'+
                '                    <option value="Algeria">Algeria</option>'+
                '                    <option value="American Samoa">American Samoa</option>'+
                '                    <option value="Andorra">Andorra</option>'+
                '                    <option value="Angola">Angola</option>'+
                '                    <option value="Anguilla">Anguilla</option>'+
                '                    <option value="Antarctica">Antarctica</option>'+
                '                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>'+
                '                    <option value="Argentina">Argentina</option>'+
                '                    <option value="Armenia">Armenia</option>'+
                '                    <option value="Aruba">Aruba</option>'+
                '                    <option value="Australia">Australia</option>'+
                '                    <option value="Austria">Austria</option>'+
                '                    <option value="Azerbaijan">Azerbaijan</option>'+
                '                    <option value="Bahamas">Bahamas</option>'+
                '                    <option value="Bahrain">Bahrain</option>'+
                '                    <option value="Bangladesh">Bangladesh</option>'+
                '                    <option value="Barbados">Barbados</option>'+
                '                    <option value="Belarus">Belarus</option>'+
                '                    <option value="Belgium">Belgium</option>'+
                '                    <option value="Belize">Belize</option>'+
                '                    <option value="Benin">Benin</option>'+
                '                    <option value="Bermuda">Bermuda</option>'+
                '                    <option value="Bhutan">Bhutan</option>'+
                '                    <option value="Bolivia">Bolivia</option>'+
                '                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>'+
                '                    <option value="Botswana">Botswana</option>'+
                '                    <option value="Bouvet Island">Bouvet Island</option>'+
                '                    <option value="Brazil">Brazil</option>'+
                '                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>'+
                '                    <option value="Brunei Darussalam">Brunei Darussalam</option>'+
                '                    <option value="Bulgaria">Bulgaria</option>'+
                '                    <option value="Burkina Faso">Burkina Faso</option>'+
                '                    <option value="Burundi">Burundi</option>'+
                '                    <option value="Cambodia">Cambodia</option>'+
                '                    <option value="Cameroon">Cameroon</option>'+
                '                    <option value="Canada">Canada</option>'+
                '                    <option value="Cape Verde">Cape Verde</option>'+
                '                    <option value="Cayman Islands">Cayman Islands</option>'+
                '                    <option value="Central African Republic">Central African Republic</option>'+
                '                    <option value="Chad">Chad</option>'+
                '                    <option value="Chile">Chile</option>'+
                '                    <option value="China">China</option>'+
                '                    <option value="Christmas Island">Christmas Island</option>'+
                '                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>'+
                '                    <option value="Colombia">Colombia</option>'+
                '                    <option value="Comoros">Comoros</option>'+
                '                    <option value="Congo">Congo</option>'+
                '                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>'+
                '                    <option value="Cook Islands">Cook Islands</option>'+
                '                    <option value="Costa Rica">Costa Rica</option>'+
                '                    <option value="Cote D\'ivoire">Cote D\'ivoire</option>'+
                '                    <option value="Croatia">Croatia</option>'+
                '                    <option value="Cuba">Cuba</option>'+
                '                    <option value="Cyprus">Cyprus</option>'+
                '                    <option value="Czech Republic">Czech Republic</option>'+
                '                    <option value="Denmark">Denmark</option>'+
                '                    <option value="Djibouti">Djibouti</option>'+
                '                    <option value="Dominica">Dominica</option>'+
                '                    <option value="Dominican Republic">Dominican Republic</option>'+
                '                    <option value="Ecuador">Ecuador</option>'+
                '                    <option value="Egypt">Egypt</option>'+
                '                    <option value="El Salvador">El Salvador</option>'+
                '                    <option value="Equatorial Guinea">Equatorial Guinea</option>'+
                '                    <option value="Eritrea">Eritrea</option>'+
                '                    <option value="Estonia">Estonia</option>'+
                '                    <option value="Ethiopia">Ethiopia</option>'+
                '                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>'+
                '                    <option value="Faroe Islands">Faroe Islands</option>'+
                '                    <option value="Fiji">Fiji</option>'+
                '                    <option value="Finland">Finland</option>'+
                '                    <option value="France">France</option>'+
                '                    <option value="French Guiana">French Guiana</option>'+
                '                    <option value="French Polynesia">French Polynesia</option>'+
                '                    <option value="French Southern Territories">French Southern Territories</option>'+
                '                    <option value="Gabon">Gabon</option>'+
                '                    <option value="Gambia">Gambia</option>'+
                '                    <option value="Georgia">Georgia</option>'+
                '                    <option value="Germany">Germany</option>'+
                '                    <option value="Ghana">Ghana</option>'+
                '                    <option value="Gibraltar">Gibraltar</option>'+
                '                    <option value="Greece">Greece</option>'+
                '                    <option value="Greenland">Greenland</option>'+
                '                    <option value="Grenada">Grenada</option>'+
                '                    <option value="Guadeloupe">Guadeloupe</option>'+
                '                    <option value="Guam">Guam</option>'+
                '                    <option value="Guatemala">Guatemala</option>'+
                '                    <option value="Guinea">Guinea</option>'+
                '                    <option value="Guinea-bissau">Guinea-bissau</option>'+
                '                    <option value="Guyana">Guyana</option>'+
                '                    <option value="Haiti">Haiti</option>'+
                '                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>'+
                '                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>'+
                '                    <option value="Honduras">Honduras</option>'+
                '                    <option value="Hong Kong">Hong Kong</option>'+
                '                    <option value="Hungary">Hungary</option>'+
                '                    <option value="Iceland">Iceland</option>'+
                '                    <option value="India">India</option>'+
                '                    <option value="Indonesia">Indonesia</option>'+
                '                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>'+
                '                    <option value="Iraq">Iraq</option>'+
                '                    <option value="Ireland">Ireland</option>'+
                '                    <option value="Israel">Israel</option>'+
                '                    <option value="Italy">Italy</option>'+
                '                    <option value="Jamaica">Jamaica</option>'+
                '                    <option value="Japan">Japan</option>'+
                '                    <option value="Jordan">Jordan</option>'+
                '                    <option value="Kazakhstan">Kazakhstan</option>'+
                '                    <option value="Kenya">Kenya</option>'+
                '                    <option value="Kiribati">Kiribati</option>'+
                '                    <option value="Korea, Democratic People\'s Republic of">Korea, Democratic People\'s Republic of'+
                '                    </option>'+
                '                    <option value="Korea, Republic of">Korea, Republic of</option>'+
                '                    <option value="Kuwait">Kuwait</option>'+
                '                    <option value="Kyrgyzstan">Kyrgyzstan</option>'+
                '                    <option value="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option>'+
                '                    <option value="Latvia">Latvia</option>'+
                '                    <option value="Lebanon">Lebanon</option>'+
                '                    <option value="Lesotho">Lesotho</option>'+
                '                    <option value="Liberia">Liberia</option>'+
                '                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>'+
                '                    <option value="Liechtenstein">Liechtenstein</option>'+
                '                    <option value="Lithuania">Lithuania</option>'+
                '                    <option value="Luxembourg">Luxembourg</option>'+
                '                    <option value="Macao">Macao</option>'+
                '                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic'+
                '                        of'+
                '                    </option>'+
                '                    <option value="Madagascar">Madagascar</option>'+
                '                    <option value="Malawi">Malawi</option>'+
                '                    <option value="Malaysia">Malaysia</option>'+
                '                    <option value="Maldives">Maldives</option>'+
                '                    <option value="Mali">Mali</option>'+
                '                    <option value="Malta">Malta</option>'+
                '                    <option value="Marshall Islands">Marshall Islands</option>'+
                '                    <option value="Martinique">Martinique</option>'+
                '                    <option value="Mauritania">Mauritania</option>'+
                '                    <option value="Mauritius">Mauritius</option>'+
                '                    <option value="Mayotte">Mayotte</option>'+
                '                    <option value="Mexico">Mexico</option>'+
                '                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>'+
                '                    <option value="Moldova, Republic of">Moldova, Republic of</option>'+
                '                    <option value="Monaco">Monaco</option>'+
                '                    <option value="Mongolia">Mongolia</option>'+
                '                    <option value="Montserrat">Montserrat</option>'+
                '                    <option value="Morocco">Morocco</option>'+
                '                    <option value="Mozambique">Mozambique</option>'+
                '                    <option value="Myanmar">Myanmar</option>'+
                '                    <option value="Namibia">Namibia</option>'+
                '                    <option value="Nauru">Nauru</option>'+
                '                    <option value="Nepal">Nepal</option>'+
                '                    <option value="Netherlands">Netherlands</option>'+
                '                    <option value="Netherlands Antilles">Netherlands Antilles</option>'+
                '                    <option value="New Caledonia">New Caledonia</option>'+
                '                    <option value="New Zealand">New Zealand</option>'+
                '                    <option value="Nicaragua">Nicaragua</option>'+
                '                    <option value="Niger">Niger</option>'+
                '                    <option value="Nigeria">Nigeria</option>'+
                '                    <option value="Niue">Niue</option>'+
                '                    <option value="Norfolk Island">Norfolk Island</option>'+
                '                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>'+
                '                    <option value="Norway">Norway</option>'+
                '                    <option value="Oman">Oman</option>'+
                '                    <option value="Pakistan">Pakistan</option>'+
                '                    <option value="Palau">Palau</option>'+
                '                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>'+
                '                    <option value="Panama">Panama</option>'+
                '                    <option value="Papua New Guinea">Papua New Guinea</option>'+
                '                    <option value="Paraguay">Paraguay</option>'+
                '                    <option value="Peru">Peru</option>'+
                '                    <option value="Philippines">Philippines</option>'+
                '                    <option value="Pitcairn">Pitcairn</option>'+
                '                    <option value="Poland">Poland</option>'+
                '                    <option value="Portugal">Portugal</option>'+
                '                    <option value="Puerto Rico">Puerto Rico</option>'+
                '                    <option value="Qatar">Qatar</option>'+
                '                    <option value="Reunion">Reunion</option>'+
                '                    <option value="Romania">Romania</option>'+
                '                    <option value="Russian Federation">Russian Federation</option>'+
                '                    <option value="Rwanda">Rwanda</option>'+
                '                    <option value="Saint Helena">Saint Helena</option>'+
                '                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>'+
                '                    <option value="Saint Lucia">Saint Lucia</option>'+
                '                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>'+
                '                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>'+
                '                    <option value="Samoa">Samoa</option>'+
                '                    <option value="San Marino">San Marino</option>'+
                '                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>'+
                '                    <option value="Saudi Arabia">Saudi Arabia</option>'+
                '                    <option value="Senegal">Senegal</option>'+
                '                    <option value="Serbia and Montenegro">Serbia and Montenegro</option>'+
                '                    <option value="Seychelles">Seychelles</option>'+
                '                    <option value="Sierra Leone">Sierra Leone</option>'+
                '                    <option value="Singapore">Singapore</option>'+
                '                    <option value="Slovakia">Slovakia</option>'+
                '                    <option value="Slovenia">Slovenia</option>'+
                '                    <option value="Solomon Islands">Solomon Islands</option>'+
                '                    <option value="Somalia">Somalia</option>'+
                '                    <option value="South Africa">South Africa</option>'+
                '                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich'+
                '                        Islands'+
                '                    </option>'+
                '                    <option value="Spain">Spain</option>'+
                '                    <option value="Sri Lanka">Sri Lanka</option>'+
                '                    <option value="Sudan">Sudan</option>'+
                '                    <option value="Suriname">Suriname</option>'+
                '                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>'+
                '                    <option value="Swaziland">Swaziland</option>'+
                '                    <option value="Sweden">Sweden</option>'+
                '                    <option value="Switzerland">Switzerland</option>'+
                '                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>'+
                '                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>'+
                '                    <option value="Tajikistan">Tajikistan</option>'+
                '                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>'+
                '                    <option value="Thailand">Thailand</option>'+
                '                    <option value="Timor-leste">Timor-leste</option>'+
                '                    <option value="Togo">Togo</option>'+
                '                    <option value="Tokelau">Tokelau</option>'+
                '                    <option value="Tonga">Tonga</option>'+
                '                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>'+
                '                    <option value="Tunisia">Tunisia</option>'+
                '                    <option value="Turkey">Turkey</option>'+
                '                    <option value="Turkmenistan">Turkmenistan</option>'+
                '                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>'+
                '                    <option value="Tuvalu">Tuvalu</option>'+
                '                    <option value="Uganda">Uganda</option>'+
                '                    <option value="Ukraine">Ukraine</option>'+
                '                    <option value="United Arab Emirates">United Arab Emirates</option>'+
                '                    <option value="United Kingdom">United Kingdom</option>'+
                '                    <option value="United States">United States</option>'+
                '                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>'+
                '                    <option value="Uruguay">Uruguay</option>'+
                '                    <option value="Uzbekistan">Uzbekistan</option>'+
                '                    <option value="Vanuatu">Vanuatu</option>'+
                '                    <option value="Venezuela">Venezuela</option>'+
                '                    <option value="Viet Nam">Viet Nam</option>'+
                '                    <option value="Virgin Islands, British">Virgin Islands, British</option>'+
                '                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>'+
                '                    <option value="Wallis and Futuna">Wallis and Futuna</option>'+
                '                    <option value="Western Sahara">Western Sahara</option>'+
                '                    <option value="Yemen">Yemen</option>'+
                '                    <option value="Zambia">Zambia</option>'+
                '                    <option value="Zimbabwe">Zimbabwe</option>'+
                '                </select></div>'+
                '        </div>'+
                '        <div class="form-group"><label for="country" class="col-sm-2 control-label">Category</label>'+
                '            <div class="col-md-10"><select size="0" name="category" id="category"'+
                '                                           class="form-control col-lg-12 col-md-12 col-sm-4 col-xs-12">'+
                '                    <option>Category</option>'+
                '                    <option value="1">New</option>'+
                '                    <option value="2">Entertainment</option>'+
                '                    <option value="3">New Skill</option>'+
                '                    <option value="4">Adventure</option>'+
                '                    <option value="5">Sporting</option>'+
                '                    <option value="6">Marine</option>'+
                '                    <option value="7">Nature</option>'+
                '                </select></div>'+
                '        </div>'+
                '        <div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Description</label>'+
                '            <div class="col-sm-10"><input name="all_files" id="all_files" type="hidden"> <textarea name="description"'+
                '                                                                                                   id="description"'+
                '                                                                                                   placeholder="'+d.description+'"'+
                '                                                                                                   class="form-control"></textarea>'+
                '                <span folder="directory" value="uploads/avatars" class="hidden"></span> <input'+
                '                        value="'+$("meta[name='csrf-token']").attr('content')+'" name="_token" type="hidden">'+
                '                <div><input accept="image/!*" id="file-input" multiple="multiple" style="margin-top: 1em;" type="file">'+
                '                </div>'+
                '            </div>'+
                '        </div>'+
                        '<div class="form-group" style="float: right">'+
                        '                <button type="button" class="btn btn-success update-goal" style="cursor: pointer;"><i class="glyphicon "></i>&nbsp;Update'+
                        '                </button>'+
                        '                <button type="button" class="btn btn-danger cancel-update-goal" style="cursor: pointer;"><i class="glyphicon "></i>&nbsp;Cancel'+
                        '                </button>'+
                        '            </div>'+
                '    </div>'+
                '</div>'+
            '</div>';


            return output;
        }*/
    },
    mounted() {

    },
    //router
});







