$(document).ready(function() {

    const arr = [];
    var total = 0;
    var desc = 0;
    var totalNeto = 0
    

    $('#aplicardesc').click(function () {
        var descM = $('#descuentoM').val();
        var descP = $('#descuentoP').val();

        if ($('#descuentoP').val() != '' && $('#descuentoM').val() != '') {
            alert('No es posible aplicar este decuento !!');
            $('#descuentoP').val('');
            $('#descuentoM').val('');
        }

        if ($('#descuentoP').val() != '') {
             var des = (descP / 100);
             totalNeto -= (des * totalNeto);
            $('#descuentoP').val('');
        }

        if ($('#descuentoM').val() != '') {
            totalNeto -= descM;
            $('#descuentoM').val('');
        }

        $('#total').val(totalNeto);
    });
    
    
    

    $('.td').keypress(function (e) {
        console.log('key', $(this).val());
    })

    var table = $('#datatable').DataTable();

    // Cargar agregar PRODUCTOS A LA COTIZACIÓN
    table.on('click', '.addBtn', function(e) {

        e.preventDefault();

        $tr = $(this).closest('tr');
        if ($($tr).hasClass('child')) {
            $tr = $tr.prev('.parent');
        }

        var datat = table.row($tr).data();

        var idProduct = datat[0];
        var nombre = datat[2];
        var precio = datat[4];
        var precioint = parseInt(precio);

        if ($('#FK_id_user').val() === 'Elije una Categoria...') {
            return alert('Deber de escoger un usuario');
        }

        var FK_id_user = $('#FK_id_user').val();

        const ob = {
            FK_id_user,
            idProduct,
        };
        arr.push(ob);

        $('#tr').append('<tr><td>'+idProduct+'</td><td>'+nombre+'</td><td><input value="' +precio+'"></td></tr>');
        
        totalNeto =  total+=precioint

        $('#total').val(totalNeto);

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            method: 'POST',
            url: "/agregarproducto",
            dataType: 'json',
            data: {
                detalle: ob
            }
        }).done(function(res) {
            console.log(res);
        });

    });
});