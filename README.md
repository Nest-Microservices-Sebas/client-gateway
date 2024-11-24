<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Client Gateway

## Dev
1. Clonar el repo.
2. Instalar dependencias.
3. Crear un archivo `.env` con las variables de entorno apuntando a los Microservicios.
4. Levantar el servidor de NATS.
5. Tener levantados los microservicios que se van a consumir.
6. Ejecutar `npm run start:dev`

## Nats
```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```