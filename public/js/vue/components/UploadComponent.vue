<template>
    <div>
        <input type="file" class="" accept="image/*" @change="uploadImage($event)" id="file-input"
               style="margin-top: 1em" multiple>
    </div>
</template>

<script type="text/javascript">
    module.exports = {
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
    }
</script>
<style>


</style>
