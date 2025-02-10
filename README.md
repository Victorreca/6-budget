# S6. Pressupostos (Angular)

Aplicación web para generar presupuestos de servicios digitales, permitiendo a los usuarios calcular y gestionar múltiples presupuestos con funcionalidades avanzadas como filtros, ordenación y búsqueda.

## 📄 Descripción

Esta aplicación permite a los usuarios seleccionar diferentes servicios digitales y calcular su presupuesto en tiempo real. Ofrece opciones avanzadas de personalización para la creación de páginas web, además de herramientas de búsqueda, filtrado y ordenación de presupuestos almacenados.

## ✨ Características

- **Selección de Servicios y Cálculo de Presupuesto**:

  - Se presentan tres opciones de servicios:
    - Campaña SEO (300€)
    - Campaña de Publicidad (400€)
    - Creación de Página Web (500€)
  - El precio total se actualiza dinámicamente según los servicios seleccionados.

  - Implementación con Reactive Forms para garantizar la validación de datos en tiempo real.

- **Personalización del Servicio de Página Web**:

  - Si se selecciona el servicio de página web, se activa un panel interactivo donde el usuario puede ajustar:
    - Número de páginas
    - Número de idiomas
  - Cálculo del coste basado en la fórmula:
    - Coste Web = 500€ + (Número de Páginas - 1) _ 30€ + (Número de Idiomas - 1) _ (Número de Páginas \* 30€)
  - Uso de un servicio centralizado BudgetService para manejar la lógica de cálculo.
  - Controles incrementales para modificar los valores fácilmente.

- **Información y Ayuda Interactiva**:

  - Implementación de un botón con un modal de ayuda que explica el funcionamiento de la selección de páginas e idiomas.
  - Uso de modales de Bootstrap para mejorar la experiencia de usuario.

- **Gestión de Presupuestos**:

  - Posibilidad de generar múltiples presupuestos y almacenarlos.
  - Introducción de datos obligatorios:
    - Nombre del cliente/a
    - Teléfono
    - Correo electrónico
  - Cada presupuesto se guarda en una lista consultable y compartible.

- **Ordenación de Presupuestos**:

  - Implementación de tres botones para ordenar la lista de presupuestos por:
    - Fecha (por defecto, del más reciente al más antiguo).
    - Precio (ascendente o descendente).
    - Nombre del cliente/a (orden alfabético).

- **Búsqueda de Presupuestos**:

  - Implementación de un campo de búsqueda que permite filtrar presupuestos por el nombre del cliente/a en tiempo real.

- **Sincronización con la URL**:

  - El estado del formulario y los servicios seleccionados se reflejan en la URL mediante queryParams.

  - Permite compartir presupuestos con una URL específica que mantiene la configuración seleccionada.

## 💻 Tecnologías Utilizadas

- HTML5
- SCSS
- TypeScript
- [Angular CLI](https://angular.dev/) version 19.0.0.
- Reactive Forms para validaciones avanzadas
- [Bootstrap 5](https://getbootstrap.com/)
- Jasmine para tests unitarios

## 📋 Requisitos

- Navegador web moderno.
- Node.js y npm instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
- Angular CLI instalado globalmente. Puedes instalarlo con el siguiente comando:

```bash
npm install -g @angular/cli
```

## 🛠️ Instalación

**✔️ Paso 1:** Clona el repositorio:

```bash
git clone https://github.com/Victorreca/6-budget
```

**✔️ Paso 2:** Ingresa al directorio del proyecto:

```bash
cd 6-budget
```

**✔️ Paso 3:** Instala las dependencias:

```bash
npm install
```

**✔️ Paso 4:** Inicia el servidor de desarrollo:

```bash
ng serve -o
```

## 🛠️ Uso

1. Acceso a la aplicación:

- Una vez que el servidor de desarrollo esté en ejecución (ng serve -o), se abrirá automáticamente en el navegador en la dirección http://localhost:4200.

2. Navegación por la aplicación:

- Seleccionar servicios: Escoge los servicios deseados y observa el cálculo dinámico del presupuesto.

- Personalizar páginas web: Ajusta el número de páginas e idiomas si se selecciona la opción web.

- Gestionar presupuestos: Completa los datos del cliente y guarda el presupuesto.

- Buscar y ordenar: Usa los botones de ordenación y el buscador para encontrar presupuestos rápidamente.

- Compartir presupuesto: Copia la URL y compártela con otros usuarios para que puedan ver el mismo presupuesto.

## 🤝 Contribuciones

¡Gracias por tu interés en contribuir! Para colaborar:

1. Realiza un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:

```bash
git checkout -b nombre-rama
```

3. Realiza tus cambios y asegúrate de seguir las guías de estilo del código.
4. Crea un pull request detallando los cambios realizados.
