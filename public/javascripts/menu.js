/* Autor: Cortez Ramirez Jose Kevyn
    Fecha: Noviembre 2020*/
$(document).ready(function(){
    varelement= $('meta[name="active-menu"]').attr('content');
    $('#'+ element).addClass('active');
});