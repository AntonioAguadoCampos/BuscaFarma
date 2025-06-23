<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reserva</title>
</head>
<body>
    <h1>¡Hola!</h1>
    @if ($status === 'approved') 
        <p>Hemos aceptado la reserva. El identificador de tu reserva es {{ $id }}. Te esperamos para que recojas tu pedido</p>
    @else
        <p>Lamentablemente hemos tenido que rechazar tu reserva. Lo sentimos</p>
    @endif
</body>
</html>