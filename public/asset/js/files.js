SingleFileUpload = {
    Load : function(form, target, type){
        // 검사 로직
        // var file_split = $("#singleFile").val().split("\\");
        //     file_name = file_split[file_split.length-1]

        $("#"+form).ajaxSubmit({
            target      : '#'+target,
            url         : '/manager/common/files/single_upload',
            type        : 'POST',
            dataType    : 'json',
            timeout     : 10000,
            success     : function(responseText, statusText, xhr, $form){
                console.log('11');
                console.log(statusText);
                if(statusText == 'success'){
                    if(responseText.file_name){
                        SingleFileUpload.Append(responseText, type);
                    } else {
                        SingleFileUpload.Error(responseText);
                    }
                } else {
                    SingleFileUpload.Error(responseText);
                }
            }
        });
    },
    Append : function(row, type){
        var mode_name = '',
            download = '/manager/common/files/simple_download?file_ori_name='+row.orig_name+'&file_name='+row.file_name,
            fileInfo = row.orig_name + '|' + row.file_name + '|' + type;

        switch(type){
            case 'S1' : type_name = '리스트 이미지';
                break;
            case 'P1' : type_name = '얼굴 사진 (전)';
                break;
            case 'P2' : type_name = '얼굴 사진 (후)';
                break;
            case 'P3' : type_name = '입안 사진 (전)';
                break;
            case 'P4' : type_name = '입안 사진 (후)';
                break;
            case 'L1' : type_name = '리스트 이미지 (전)';
                break;
            case 'L2' : type_name = '리스트 이미지 (후)';
                break;
            default : type_name = '';
                break;
        }

        html = '<tr class="overlap">';
        html += '<input type="hidden" name="fileinfo[]" value="'+fileInfo+'" />';
        html += '<td>'+type_name+'</td>';
        html += '<td>'+row.orig_name+'</td>';
        html += '<td>'+DragFileUpload.FileSizeConv(row.file_size)+'</td>';
        html += '<td><a href="#self" name="upBtn">▲</a>&nbsp;<a href="#self" name="downBtn">▼</a></td>';
        html += '<td><a href="'+download+'">DOWNLOAD</a></td>';
        html += '<td><a href="#self" name="fileDel">X</a></td>';
        html += '</tr>';

        if(type == 'S1'){
            $("#file_history").find('.overlap').remove();
        }
        $("#file_history").append(html);

        $("a[name=fileDel]").unbind("click").bind("click", function(){
            var str = $(this).parent().siblings(':first').val(),
                arr = str.split("|"),
                no = '',
                filename = arr[1];

            FileDel.Load(no, filename);
            $(this).parent().parent().detach();
        });

        FileMove.Process();
    },
    Error : function(row){
        if(row){
            var msg = row.replace(/(<([^>]+)>)/gi, "");

            alert(msg);
        } else {
            alert("업로드 실패 하였습니다.");
        }
        return;
    },
    FileSizeConv : function(filesize, decimals){
        if(filesize == 0) return '0 KB';
        var k = 1000;
        var dm = decimals + 1 || 2;
        var sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(filesize) / Math.log(k));
        return parseFloat((filesize / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

DragFileUpload = {
    Load : function(mode, limit, type){
        fd.jQuery();

        var options = {
            iframe: {
                url: '/manager/common/files/upload'
            }
        }

        $("#dragFile").filedrop(options)
        .on('fdsend', function(e, files){
            files.each(function(file){
                // 용량 검사
                var mbytes = Math.round(file.size / Math.pow(1024, 2), 2);
                if(mbytes >= limit){
                    alert("업로드 파일 크기 제한 : "+limit+"Mb 미만의 파일만 업로드 가능합니다.");
                }

                // 금지 확장자 검사
                file.name = DragFileUpload.ExtCheck(file.name);

                // 이미지 일 경우에만
                if(mode == "img"){
                    if(DragFileUpload.ImgExtCheck(file.name) == 0){
                        file.sendTo('/manager/common/files/upload');
                    } else {
                        alert("업로드가 불가능합니다.");
                    }
                } else {
                    file.sendTo('/manager/common/files/upload');
                }
            });
        })
        .on('filedone', function(e, file, xhr){
            DragFileUpload.Append(xhr.responseText, type);
        })
        .on('fdiframedone', function(e, xhr){
            DragFileUpload.Append(xhr.responseText, type);
        });
    },
    Append : function(fileinfo, type){
        var type_name = '',
            row = $.parseJSON(fileinfo),
            download = '/manager/common/files/simple_download?file_ori_name='+row.orig_name+'&file_name='+row.file_name,
            fileInfo = row.orig_name + '|' + row.file_name + '|' + type;

        switch(type){
            case 'M1' : type_name = '첨부파일';
                break;
            default : type_name = '';
                break;
        }

        if(row.file_name){
            html = '<tr>';
            html += '<input type="hidden" name="fileinfo[]" value="'+fileInfo+'" />';
            html += '<td>'+type_name+'</td>';
            html += '<td>'+row.orig_name+'</td>';
            html += '<td>'+DragFileUpload.FileSizeConv(row.file_size)+'</td>';
            html += '<td><a href="#self" name="upBtn">▲</a>&nbsp;<a href="#self" name="downBtn">▼</a></td>';
            html += '<td><a href="'+download+'">DOWNLOAD</a></td>';
            html += '<td><a href="#self" name="fileDel">X</a></td>';
            html += '</tr>';

            $("#file_history").append(html);

            $("a[name=fileDel]").unbind("click").bind("click", function(){
                var str = $(this).parent().siblings(':first').val(),
                arr = str.split("|"),
                no = '',
                filename = arr[1];

                FileDel.Load(no, filename);
                $(this).parent().parent().detach();
            });
        } else {
            var msg = row.replace(/(<([^>]+)>)/gi, "");
            alert(msg);
        }

        FileMove.Process();

        // var cnt = 1;
        // $("#file_history tr").each(function(){
        //     if($(this).children('input').val().indexOf('M1') != -1){
        //         cnt++;

        //         var input_val = $(this).children('input').val();
        //         $(this).children('input').val(input_val + '|' + cnt);
        //     }
        // });
    },
    ImgExtCheck : function(filename){
        var ext = ['jpg', 'jpeg', 'png', 'gif'];
        var name = filename.split(/[\s.]+/);

        if($.inArray(name[name.length-1], ext) !== -1){
            return 0;
        } else {
            return 1;
        }
    },
    ExtCheck : function(filename){
        var mime = ['exe', 'php', 'phps', 'asp', 'js', 'jsp', 'class', 'bin', 'fla', 'css', 'html', 'htm', 'xml', 'htmls', 'java', 'json'];

        String.prototype.replaceArray = function(find, replace) {
            var replaceString = this;
            for (var i = 0; i < find.length; i++) {
                replaceString = replaceString.replace(find[i], replace);
            }
            return replaceString;
        };

        return filename.replaceArray(mime, "txt");
    },
    FileSizeConv : function(filesize, decimals){
        if(filesize == 0) return '0 KB';
        var k = 1000;
        var dm = decimals + 1 || 2;
        var sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(filesize) / Math.log(k));
        return parseFloat((filesize / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

FileDel = {
    Click : function(){
        $("a[name=fileDelM]").unbind("click").bind("click", function(){
            var str = $(this).parent().siblings(':first').val(),
                arr = str.split("|"),
                no = arr[3],
                filename = arr[1];

            FileDel.Load(no, filename);
            $(this).parent().parent().detach();
        });
    },
    Load : function(no, filename){
        Common.POST("/manager/common/files/delete", { no: no, filename: filename }).done(function(result){
            alert(result);
        }).fail(function(){
            alert(arguments[1]);
        });
    }
}

FileMove = {
    Process : function(){
        $("a[name=upBtn], a[name=downBtn]").unbind('click').click(function(){
            var row = $(this).closest('tr');

            if ($(this).is("a[name=upBtn]")) {
                row.insertBefore(row.prev());
            } else {
                row.insertAfter(row.next());
            }
        });
    }
}

$(document).ready(function(){
    FileDel.Click();
    FileMove.Process();
});