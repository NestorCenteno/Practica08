//actions
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});

function escribir(texto){
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("practica8.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);
            writer.onwriteend = function(evt) {
                navigator.notification.alert("el archivo fue escrito satisfactoriamente.",null,"escribir","aceptar");
            };
        };
        writer.write(texto);
    }

    function fail(error) {
        alert(error.code);
    }
}

function leer(){
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("practica8.txt", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(readAsText, fail);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            $("#arcLeer").val(evt.target.result);
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        alert(evt.target.error.code);
    }
}

$(function(){
    $('#archivos .individual li').tap(function(){
        if($(this).index()==0){//escribir
            escribir($("#arcEscribir").val());
        }
        else{//leer
            //var erc=$("#arcEscribir").val()
            //alert(erc);
            //$("#arcLeer").val(erc);
            leer();
        }
    });
});