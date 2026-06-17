drop database if exists Sky_IN5CM;
create database Sky_IN5CM;
use Sky_IN5CM;

create table Cliente (
    id_cliente int auto_increment primary key,
    nombre varchar(100),
    apellido_empresa varchar(100),
    telefono varchar(20),
    correo varchar(100),
    direccion varchar(200)
);

create table Sucursal (
    id_sucursal int auto_increment primary key,
    nombre varchar(100),
    ubicacion varchar(200),
    telefono varchar(20)
);

create table Ruta (
    id_ruta int auto_increment primary key,
    origen varchar(100),
    destino varchar(100),
    distancia_km int,
    tiempo_estimado varchar(50)
);

create table Vehiculo (
    id_vehiculo int auto_increment primary key,
    placa varchar(20),
    tipo varchar(50),
    capacidad varchar(50),
    estado varchar(50)
);

create table Envio (
    id_envio int auto_increment primary key,
    fecha_envio date,
    estado varchar(50),
    costo decimal(10,2),
    id_cliente int,
    id_sucursal_origen int,
    id_sucursal_destino int,
    foreign key (id_cliente) references Cliente(id_cliente),
    foreign key (id_sucursal_origen) references Sucursal(id_sucursal),
    foreign key (id_sucursal_destino) references Sucursal(id_sucursal)
);

create table Paquete (
    id_paquete int auto_increment primary key,
    peso decimal(10,2),
    tamaño varchar(50),
    descripcion text,
    valor_declarado decimal(10,2),
    id_envio int,
    foreign key (id_envio) references Envio(id_envio)
);

create table Tracking (
    id_tracking int auto_increment primary key,
    codigo_tracking varchar(50),
    ubicacion_actual varchar(100),
    estado_actual varchar(50),
    fecha_actualizacion datetime,
    id_envio int,
    foreign key (id_envio) references Envio(id_envio)
);

create table Vuelo (
    id_vuelo int auto_increment primary key,
    numero_vuelo varchar(50),
    origen varchar(100),
    destino varchar(100),
    fecha_salida datetime,
    fecha_llegada datetime,
    id_ruta int,
    foreign key (id_ruta) references Ruta(id_ruta)
);

create table Empleado (
    id_empleado int auto_increment primary key,
    nombre varchar(100),
    puesto varchar(50),
    telefono varchar(20),
    id_sucursal int,
    foreign key (id_sucursal) references Sucursal(id_sucursal)
);

create table Pago (
    id_pago int auto_increment primary key,
    monto decimal(10,2),
    metodo_pago varchar(50),
    fecha_pago date,
    id_envio int,
    foreign key (id_envio) references Envio(id_envio)
);

-- Procedimientos de almacenado de cliente--
delimiter $$

create procedure sp_crear_cliente(
    in p_nombre varchar(100),
    in p_apellido_empresa varchar(100),
    in p_telefono varchar(20),
    in p_correo varchar(100),
    in p_direccion varchar(200)
)
begin
    insert into Cliente(nombre, apellido_empresa, telefono, correo, direccion)
    value(p_nombre, p_apellido_empresa, p_telefono, p_correo, p_direccion);
end $$

create procedure sp_actualizar_cliente(
    in p_id int,
    in p_nombre varchar(100),
    in p_apellido_empresa varchar(100),
    in p_telefono varchar(20),
    in p_correo varchar(100),
    in p_direccion varchar(200)
)
begin
    update Cliente
    set nombre=p_nombre,
        apellido_empresa=p_apellido_empresa,
        telefono=p_telefono,
        correo=p_correo,
        direccion=p_direccion
    where id_cliente=p_id;
end $$

create procedure sp_eliminar_cliente(in p_id int)
begin
    delete from Cliente
    where id_cliente=p_id;
end $$

create procedure sp_buscar_cliente(in p_id int)
begin
    select * from Cliente
    where id_cliente=p_id;
end $$

create procedure sp_listar_cliente()
begin
    select * from Cliente;
end $$

delimiter ;

-- Procedimientos de almacenado de sucursal--

delimiter $$

create procedure sp_crear_sucursal(
    in p_nombre varchar(100),
    in p_ubicacion varchar(200),
    in p_telefono varchar(20)
)
begin
    insert into Sucursal(nombre, ubicacion, telefono)
    values(p_nombre,p_ubicacion,p_telefono);
end $$

create procedure sp_actualizar_sucursal(
    in p_id int,
    in p_nombre varchar(100),
    in p_ubicacion varchar(200),
    in p_telefono varchar(20)
)
begin
    update Sucursal
    set nombre=p_nombre,
        ubicacion=p_ubicacion,
        telefono=p_telefono
    where id_sucursal=p_id;
end $$

create procedure sp_eliminar_sucursal(in p_id int)
begin
    delete from Sucursal
    where id_sucursal=p_id;
end $$

create procedure sp_buscar_sucursal(in p_id int)
begin
    select * from Sucursal
    where id_sucursal=p_id;
end $$

create procedure sp_listar_sucursal()
begin
    select * from Sucursal;
end $$

delimiter ;

-- Procedimientos de almacenado de ruta--

delimiter $$

create procedure sp_crear_ruta(
    in p_origen varchar(100),
    in p_destino varchar(100),
    in p_distancia int,
    in p_tiempo varchar(50)
)
begin
    insert into Ruta(origen,destino,distancia_km,tiempo_estimado)
    values(p_origen,p_destino,p_distancia,p_tiempo);
end $$

create procedure sp_actualizar_ruta(
    in p_id int,
    in p_origen varchar(100),
    in p_destino varchar(100),
    in p_distancia int,
    in p_tiempo varchar(50)
)
begin
    update Ruta
    set origen=p_origen,
        destino=p_destino,
        distancia_km=p_distancia,
        tiempo_estimado=p_tiempo
    where id_ruta=p_id;
end $$

create procedure sp_eliminar_ruta(in p_id int)
begin
    delete from Ruta
    where id_ruta=p_id;
end $$

create procedure sp_buscar_ruta(in p_id int)
begin
    select * from Ruta
    where id_ruta=p_id;
end $$

create procedure sp_listar_ruta()
begin
    select * from Ruta;
end $$

delimiter ;

-- Procedimientos de almacenado de vehiculo--

delimiter $$

create procedure sp_crear_vehiculo(
    in p_placa varchar(20),
    in p_tipo varchar(50),
    in p_capacidad varchar(50),
    in p_estado varchar(50)
)
begin
    insert into Vehiculo(placa,tipo,capacidad,estado)
    values(p_placa,p_tipo,p_capacidad,p_estado);
end $$

create procedure sp_actualizar_vehiculo(
    in p_id int,
    in p_placa varchar(20),
    in p_tipo varchar(50),
    in p_capacidad varchar(50),
    in p_estado varchar(50)
)
begin
    update Vehiculo
    set placa=p_placa,
        tipo=p_tipo,
        capacidad=p_capacidad,
        estado=p_estado
    where id_vehiculo=p_id;
end $$

create procedure sp_eliminar_vehiculo(in p_id int)
begin
    delete from Vehiculo
    where id_vehiculo=p_id;
end $$

create procedure sp_buscar_vehiculo(in p_id int)
begin
    select * from Vehiculo
    where id_vehiculo=p_id;
end $$

create procedure sp_listar_vehiculo()
begin
    select * from Vehiculo;
end $$

delimiter ;

-- Procedimientos de almacenado de envio--

delimiter $$

create procedure sp_crear_envio(
    in p_fecha date,
    in p_estado varchar(50),
    in p_costo decimal(10,2),
    in p_cliente int,
    in p_origen int,
    in p_destino int
)
begin
    insert into Envio(fecha_envio,estado,costo,id_cliente,id_sucursal_origen,id_sucursal_destino)
    values(p_fecha,p_estado,p_costo,p_cliente,p_origen,p_destino);
end $$

create procedure sp_actualizar_envio(
    in p_id int,
    in p_fecha date,
    in p_estado varchar(50),
    in p_costo decimal(10,2),
    in p_cliente int,
    in p_origen int,
    in p_destino int
)
begin
    update Envio
    set fecha_envio=p_fecha,
        estado=p_estado,
        costo=p_costo,
        id_cliente=p_cliente,
        id_sucursal_origen=p_origen,
        id_sucursal_destino=p_destino
    where id_envio=p_id;
end $$

create procedure sp_eliminar_envio(in p_id int)
begin
    delete from Envio
    where id_envio=p_id;
end $$

create procedure sp_buscar_envio(in p_id int)
begin
    select * from Envio
    where id_envio=p_id;
end $$

create procedure sp_listar_envio()
begin
    select * from Envio;
end $$

delimiter ;

-- Procedimientos de almacenado de paquete--

delimiter $$

create procedure sp_crear_paquete(
    in p_peso decimal(10,2),
    in p_tamano varchar(50),
    in p_descripcion text,
    in p_valor decimal(10,2),
    in p_envio int
)
begin
    insert into Paquete(peso,tamaño,descripcion,valor_declarado,id_envio)
    values(p_peso,p_tamano,p_descripcion,p_valor,p_envio);
end $$

create procedure sp_actualizar_paquete(
    in p_id int,
    in p_peso decimal(10,2),
    in p_tamano varchar(50),
    in p_descripcion text,
    in p_valor decimal(10,2),
    in p_envio int
)
begin
    update Paquete
    set peso=p_peso,
        tamaño=p_tamano,
        descripcion=p_descripcion,
        valor_declarado=p_valor,
        id_envio=p_envio
    where id_paquete=p_id;
end $$

create procedure sp_eliminar_paquete(in p_id int)
begin
    delete from Paquete
    where id_paquete=p_id;
end $$

create procedure sp_buscar_paquete(in p_id int)
begin
    select * from Paquete
    where id_paquete=p_id;
end $$

create procedure sp_listar_paquete()
begin
    select * from Paquete;
end $$

delimiter ;

-- Procedimientos de almacenado de traking--

delimiter $$

create procedure sp_crear_tracking(
    in p_codigo varchar(50),
    in p_ubicacion varchar(100),
    in p_estado varchar(50),
    in p_fecha datetime,
    in p_envio int
)
begin
    insert into tracking(
        codigo_tracking,
        ubicacion_actual,
        estado_actual,
        fecha_actualizacion,
        id_envio
    )
    values(
        p_codigo,
        p_ubicacion,
        p_estado,
        p_fecha,
        p_envio
    );
end $$

create procedure sp_actualizar_tracking(
    in p_id int,
    in p_codigo varchar(50),
    in p_ubicacion varchar(100),
    in p_estado varchar(50),
    in p_fecha datetime,
    in p_envio int
)
begin
    update tracking
    set codigo_tracking = p_codigo,
        ubicacion_actual = p_ubicacion,
        estado_actual = p_estado,
        fecha_actualizacion = p_fecha,
        id_envio = p_envio
    where id_tracking = p_id;
end $$

create procedure sp_eliminar_tracking(
    in p_id int
)
begin
    delete from tracking
    where id_tracking = p_id;
end $$

create procedure sp_buscar_tracking(
    in p_id int
)
begin
    select *
    from tracking
    where id_tracking = p_id;
end $$

create procedure sp_listar_tracking()
begin
    select *
    from tracking;
end $$

delimiter ;

-- Procedimientos de almacenado de vuelo--

delimiter $$

create procedure sp_crear_vuelo(
    in p_numero varchar(50),
    in p_origen varchar(100),
    in p_destino varchar(100),
    in p_salida datetime,
    in p_llegada datetime,
    in p_ruta int
)
begin
    insert into vuelo(
        numero_vuelo,
        origen,
        destino,
        fecha_salida,
        fecha_llegada,
        id_ruta
    )
    values(
        p_numero,
        p_origen,
        p_destino,
        p_salida,
        p_llegada,
        p_ruta
    );
end $$

create procedure sp_actualizar_vuelo(
    in p_id int,
    in p_numero varchar(50),
    in p_origen varchar(100),
    in p_destino varchar(100),
    in p_salida datetime,
    in p_llegada datetime,
    in p_ruta int
)
begin
    update vuelo
    set numero_vuelo = p_numero,
        origen = p_origen,
        destino = p_destino,
        fecha_salida = p_salida,
        fecha_llegada = p_llegada,
        id_ruta = p_ruta
    where id_vuelo = p_id;
end $$

create procedure sp_eliminar_vuelo(
    in p_id int
)
begin
    delete from vuelo
    where id_vuelo = p_id;
end $$

create procedure sp_buscar_vuelo(
    in p_id int
)
begin
    select *
    from vuelo
    where id_vuelo = p_id;
end $$

create procedure sp_listar_vuelo()
begin
    select *
    from vuelo;
end $$

delimiter ;

-- Procedimientos de almacenado de empleado--

delimiter $$

create procedure sp_crear_empleado(
    in p_nombre varchar(100),
    in p_puesto varchar(50),
    in p_telefono varchar(20),
    in p_sucursal int
)
begin
    insert into empleado(
        nombre,
        puesto,
        telefono,
        id_sucursal
    )
    values(
        p_nombre,
        p_puesto,
        p_telefono,
        p_sucursal
    );
end $$

create procedure sp_actualizar_empleado(
    in p_id int,
    in p_nombre varchar(100),
    in p_puesto varchar(50),
    in p_telefono varchar(20),
    in p_sucursal int
)
begin
    update empleado
    set nombre = p_nombre,
        puesto = p_puesto,
        telefono = p_telefono,
        id_sucursal = p_sucursal
    where id_empleado = p_id;
end $$

create procedure sp_eliminar_empleado(
    in p_id int
)
begin
    delete from empleado
    where id_empleado = p_id;
end $$

create procedure sp_buscar_empleado(
    in p_id int
)
begin
    select *
    from empleado
    where id_empleado = p_id;
end $$

create procedure sp_listar_empleado()
begin
    select *
    from empleado;
end $$

delimiter ;

-- Procedimientos de almacenado de pago--

delimiter $$

create procedure sp_crear_pago(
    in p_monto decimal(10,2),
    in p_metodo varchar(50),
    in p_fecha date,
    in p_envio int
)
begin
    insert into pago(
        monto,
        metodo_pago,
        fecha_pago,
        id_envio
    )
    values(
        p_monto,
        p_metodo,
        p_fecha,
        p_envio
    );
end $$

create procedure sp_actualizar_pago(
    in p_id int,
    in p_monto decimal(10,2),
    in p_metodo varchar(50),
    in p_fecha date,
    in p_envio int
)
begin
    update pago
    set monto = p_monto,
        metodo_pago = p_metodo,
        fecha_pago = p_fecha,
        id_envio = p_envio
    where id_pago = p_id;
end $$

create procedure sp_eliminar_pago(
    in p_id int
)
begin
    delete from pago
    where id_pago = p_id;
end $$

create procedure sp_buscar_pago(
    in p_id int
)
begin
    select *
    from pago
    where id_pago = p_id;
end $$

create procedure sp_listar_pago()
begin
    select *
    from pago;
end $$

delimiter ;

-- CLIENTES
insert into cliente (nombre, apellido_empresa, telefono, correo, direccion) values
('Juan', 'Perez', '55511111', 'juan@gmail.com', 'Zona 1'),
('Maria', 'Lopez', '55522222', 'maria@gmail.com', 'Zona 2'),
('Carlos', 'Ramirez', '55533333', 'carlos@gmail.com', 'Zona 3'),
('Ana', 'Morales', '55544444', 'ana@gmail.com', 'Zona 4'),
('Luis', 'Hernandez', '55555555', 'luis@gmail.com', 'Zona 5');

-- SUCURSALES
insert into sucursal (nombre, ubicacion, telefono) values
('Sucursal Central', 'Ciudad de Guatemala', '22221111'),
('Sucursal Norte', 'Peten', '22222222'),
('Sucursal Sur', 'Escuintla', '22223333'),
('Sucursal Oriente', 'Zacapa', '22224444'),
('Sucursal Occidente', 'Quetzaltenango', '22225555');

-- RUTAS
insert into ruta (origen, destino, distancia_km, tiempo_estimado) values
('Guatemala', 'Peten', 480, '8 horas'),
('Guatemala', 'Escuintla', 60, '1 hora'),
('Guatemala', 'Zacapa', 145, '3 horas'),
('Guatemala', 'Quetzaltenango', 200, '4 horas'),
('Peten', 'Quetzaltenango', 650, '10 horas');

-- VEHICULOS
insert into vehiculo (placa, tipo, capacidad, estado) values
('P123ABC', 'Camion', '5 Toneladas', 'Disponible'),
('P456DEF', 'Furgon', '3 Toneladas', 'Disponible'),
('P789GHI', 'Camion', '8 Toneladas', 'En Ruta'),
('P321JKL', 'Pickup', '1 Tonelada', 'Mantenimiento'),
('P654MNO', 'Furgon', '2 Toneladas', 'Disponible');

-- ENVIOS
insert into envio (fecha_envio,estado,costo,id_cliente,id_sucursal_origen,id_sucursal_destino) values
('2025-01-10', 'Entregado', 150.00, 1, 1, 2),
('2025-01-12', 'En Ruta', 200.00, 2, 1, 3),
('2025-01-15', 'Pendiente', 175.50, 3, 2, 4),
('2025-01-18', 'Entregado', 300.00, 4, 3, 5),
('2025-01-20', 'En Ruta', 250.00, 5, 4, 1);

-- PAQUETES
insert into paquete (peso,tamaño,descripcion,valor_declarado,id_envio) values
(5.50, 'Mediano', 'Ropa', 500.00, 1),
(10.00, 'Grande', 'Electrodomestico', 2500.00, 2),
(2.75, 'Pequeño', 'Documentos', 100.00, 3),
(8.20, 'Grande', 'Herramientas', 1200.00, 4),
(4.00, 'Mediano', 'Libros', 350.00, 5);

-- TRACKING
insert into tracking (codigo_tracking,ubicacion_actual,estado_actual,fecha_actualizacion,id_envio) values
('TRK001', 'Peten', 'Entregado', '2025-01-11 10:30:00', 1),
('TRK002', 'Escuintla', 'En Ruta', '2025-01-12 14:00:00', 2),
('TRK003', 'Sucursal Norte', 'Pendiente', '2025-01-15 08:00:00', 3),
('TRK004', 'Quetzaltenango', 'Entregado', '2025-01-19 12:00:00', 4),
('TRK005', 'Zacapa', 'En Ruta', '2025-01-20 15:30:00', 5);

-- VUELOS
insert into vuelo (numero_vuelo,origen,destino,fecha_salida,fecha_llegada,id_ruta) values
('SKY001', 'Guatemala', 'Peten', '2025-01-10 08:00:00', '2025-01-10 10:00:00', 1),
('SKY002', 'Guatemala', 'Escuintla', '2025-01-12 09:00:00', '2025-01-12 10:00:00', 2),
('SKY003', 'Guatemala', 'Zacapa', '2025-01-15 07:00:00', '2025-01-15 09:00:00', 3),
('SKY004', 'Guatemala', 'Quetzaltenango', '2025-01-18 06:00:00', '2025-01-18 08:00:00', 4),
('SKY005', 'Peten', 'Quetzaltenango', '2025-01-20 05:00:00', '2025-01-20 09:00:00', 5);

-- EMPLEADOS
insert into empleado (nombre,puesto,telefono,id_sucursal) values
('Pedro Gomez', 'Gerente', '44441111', 1),
('Sofia Ruiz', 'Operador', '44442222', 2),
('Miguel Castro', 'Piloto', '44443333', 3),
('Laura Diaz', 'Supervisor', '44444444', 4),
('Jose Martinez', 'Mensajero', '44445555', 5);

-- PAGOS
insert into pago (monto,metodo_pago,fecha_pago,id_envio) values
(150.00, 'Tarjeta', '2025-01-10', 1),
(200.00, 'Efectivo', '2025-01-12', 2),
(175.50, 'Transferencia', '2025-01-15', 3),
(300.00, 'Tarjeta', '2025-01-18', 4),
(250.00, 'Efectivo', '2025-01-20', 5);