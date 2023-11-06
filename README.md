# CARLOS MARADIAGA | PRUEBA ANGULAR DEVELOPER
Frontend y Backend


## Planteamiento
Vas a desarrollar un panel de administración para una empresa intermediaria de envíos de
mercancías llamada INVENT. Este panel estará protegido, por lo que será necesario iniciar sesión
para acceder a él.
Los trabajadores podrán crear envíos a través de la plataforma añadiendo estos datos:
- Dirección de destino.
- Código postal.
- Nombre del destinatario.
- Nombre del remitente.
- Peso del envio (en kg).
Una vez introducidos los datos, el sistema elegirá automáticamente la empresa transportista
encargada de realizar el envío y calculará el precio del servicio.
INVENT realiza sus expediciones a través de distintas empresas siempre que le es posible. La
elección de la empresa transportista se hace en base a los dos primeros dígitos del código
postal.

| Empresa transportista | Códigos postales |
|-----------------------|------------------|
| Correos               | 15xxx, 16xxx, 17xxx, 18xxx, 19xxx |
| Seur                  | 20xxx, 21xxx, 22xxx, 23,xxx, 24xxx, 25xxx |
| INVENT                | Si ninguna empresa se puede hacer cargo, se encargará al sistema interno de reparto |

Hay diversas categorías de envíos y para cada una de ellas se dispone de una fórmula especíca
para calcular el precio final.

| Tipo de paquete | Intervalo de kg | Fórmula cálculo precio |
|-----------------|-----------------|------------------------|
| Paquete ultra ligero | 0 < kg ≤ 0.1 | Precio = kg * 5 |
| Paquete ligero | 0.1 < kg ≤ 0.3 | Precio = kg * 5 + 1 |
| Paquete estándar | 0.3 < kg ≤ 5 | Precio = kg * 10 |
| Paquete pesado | 5 < kg ≤ 10 | Precio = kg * 5 + kg + 75 |
| Gran volumen |10 < kg ≤ ∞ | Precio = (kg−10) × 7.5 + 130 + kg|

Una vez calculado el precio y creado el envío se guardará esta información para poder visualizarla
en cualquier momento.
Tarea
Hay que desarrollar un panel de control con Angular que:
- Sólo permita el acceso a usuarios autenticados.
- Tenga cuatro listados:
- Tipos de paquete (sólo lectura).- Administradores/Trabajadores (sólo lectura).
- Envíos registrados (lectura, creación y borrado).
- Empresas externas de transporte (CRUD).

