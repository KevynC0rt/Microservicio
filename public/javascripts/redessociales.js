/* Autor: Cortez Ramirez Jose Kevyn
    Fecha: Noviembre 2020*/
$(window).ready(function(){
    $('h2').click(function(){
       if($(this).next().hasClass('desplegado')){
          $(this).next().removeClass('desplegado');
       }else{
          $(this).next().addClass('desplegado');
       }
    })
 })