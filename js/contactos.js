function listar(){
    function onSuccess(contacts) {
        for(i=0;i<=contacts.length;i++){
            $('#contactos .plastic').html('<li><a href="tel:'+contacts[i].phoneNumbers[0]+'">'+contacts[i].name.formatted+'</a></li>');
        }
    }

function onError(contactError) {
    alert('onError!');
}

// find all contacts with 'Bob' in any name field
var options      = new ContactFindOptions();
options.filter   = "c";
options.multiple = true;
var fields       = ["*"];
navigator.contacts.find(fields, onSuccess, onError, options);
}

function crear(nom,tel,mail){
    alert('dentro de crear');
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        var myContact = navigator.contacts.create();
        myContact.displayName=nom;
        myContact.nickname=nom;
        alert('var mycontact');
        
        var contacto=new ContacName();
        contacto.givenName=nom;
        contacto.familyName="Prueba";
        myContact.name=contacto;
        alert('var contacto');
        
        var telefonos=[];
        telefonos[0]=new ContactField("home",tel,true);
        telefonos[1]=new ContactField("mobile","1223323223",false);
        myContact.phoneNumbers=telefonos;
        alert('var telefonos');
        
        var correos=[];
        correos[0]=new ContactField("home",mail,true);
        myContact.emails=correos;
        alert('correos');
        
        myContact.save(function(){
            navigator.notification.alert("el contacto ha sido creado","null","contacto","aceptar");
        },function(){
            alert("no se pudo guardar el contacto");
        });
    }

}

$(function(){
    $('#acSend').tap(function(){
        var nom=$('#nc .rounded input').eq(0).val();
        var mail=$('#nc .rounded input').eq(1).val();
        var tel=$('#nc .rounded input').eq(2).val();
        crear(nom,tel,mail);
    });
    
    $("#contactos .individual li").eq(0).tap(function(){
        listar();
        alert('lista creada');
    });
});