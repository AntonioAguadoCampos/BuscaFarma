<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reserva</title>
</head>
<body>
    <h1>¡Hola!</h1>
    @if ($status === 'approved') 
        <p>Hemos aceptado la reserva.</br></br>El identificador de tu reserva es <bold>{{ $id }}</bold>.</br> Te esperamos para que recojas tu pedido en la farmacia <bold>{{ $name }}</bold>.</br> El pedido es: {{ $productsName}}</p>
    @elseif ($status === 'rejected')
        <p>Lamentablemente hemos tenido que rechazar tu reserva.</br></br>Lo sentimos desde la farmacia <bold>{{ $name }}</bold></p>
    @elseif ($status === 'deleted')
        <p>Hemos eliminado la reserva {{ $id }}. Volver a colocar los siguientes productos: {{ $productsName }}</p>
    @endif
</body>
</html>