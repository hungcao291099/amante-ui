// Global variables
// let picker = document.getElementById('picker');
let listing = document.getElementById('listing');
let box = document.getElementById('box');
let elem = document.getElementById("myBar");
let loader = document.getElementById("loader");
let counter = 1;
let total = 0;
let option_color = "";
let product_cd = $('#product_cd').val();


// On button input change (picker), process it
// picker.addEventListener('change', e => {
$("input[name='fileList']").on("change", function() {
    // Reset previous upload progress
    // elem.style.width = "0px";
    // listing.innerHTML = "None";

    // Get total of files in that folder
    let eq = $(this).attr("data-eq");

    opt_cd2 = $(this).attr("data-option");
    option_cnt = parseInt($(this).attr("data-od"));

    picker = document.getElementsByName("fileList")[eq];

    total = picker.files.length;
    counter = 1;


    // Display image animation
    // loader.style.display = "block";
    // loader.style.visibility = "visible";


    // Process every single file
    for (var i = 0; i < picker.files.length; i++) {
        var file = picker.files[i];
        add_od = option_cnt+i+1;

        // 폴더 업로드일 경우, (경로가 있을 경우) SPFFFNRN231U_WHT 규칙으로 업로드.
        // if(file.webkitRelativePath != ""){
        //     option_color = file.webkitRelativePath.split("/")[0].split("_")[1];
        // }

        sendFile(file, file.webkitRelativePath, parseInt(add_od));
    }
});


// Function to send a file, call PHP backend
sendFile = function(file, path, od) {
      // alert(path);
    var item = document.createElement('li');
    var formData = new FormData();
    var request = new XMLHttpRequest();

    // 상품 코드값 필요시
    // var product_cd = $('#product_cd').val();
    // var option_color = $('#picker').attr("option_color");

    request.responseType = 'text';

    // HTTP onload handler
    request.onload = function() {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {

                // 실제 파일 위치 (여기서 파일 리스트를 생성 하면 될듯)
                console.log(request.responseText);

                // Add file name to list
                /*
                item.textContent = request.responseText;
                listing.appendChild(item);
                */

                // listing.innerHTML = request.responseText + " (" + counter + " of " + total + " ) ";

                // // Show percentage
                // box.innerHTML = Math.min(counter / total * 100, 100).toFixed(2) + "%";

                // // Show progress bar
                // elem.innerHTML = Math.round(counter / total * 100, 100) + "%";
                // elem.style.width = Math.round(counter / total * 100) + "%";

                // Increment counter
                counter = counter + 1;
            }
            if (counter >= total) {
            //     listing.innerHTML = "Uploading " + total + " file(s) is done!";
            //     loader.style.display = "none";
            //     loader.style.visibility = "hidden";

                //업로드가 완료되면 리로드
                location.href='/manager/product/product/product_write?product_cd='+product_cd+'&mode=U&tab_gb=img_vid';
            }
        }
    };

    // Set post variables
    formData.set('file', file); // One object file
    formData.set('path', path); // String of local file's path
    formData.set('product_cd', product_cd);
    formData.set('opt_cd2', opt_cd2);
    formData.set('od', od);

// console.log(option_color);

// return;
    // alert(path);
    // Do request
    request.open("POST", '/manager/product/product/folder_upload');
    request.send(formData);

};
