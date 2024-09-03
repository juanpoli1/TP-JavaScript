class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.stock = 1;
    }
}

const uruguay = new Producto(1, "Balón Mundial 1930", 11000, "img/uruguay.jpg");
const tango = new Producto(2, "Balón Mundial 1978", 12500, "img/tango.jpg");
const azteca = new Producto(3, "Balón Mundial 1986", 13000, "img/azteca.jpg");
const italia = new Producto(4, "Balón Mundial 1990", 13500, "img/etrusco.jpg");
const brazuca = new Producto(5, "Balón Mundial 2014", 15000, "img/brazuca.jpg");
const alrihla = new Producto(6, "Balón Mundial 2022", 18000, "img/alrihla.jpg");
const camiseta1930 = new Producto(7, "Camiseta Mundial 1930", 7000, "img/camiseta1930.jpg");
const camiseta1978 = new Producto(8, "Camiseta Mundial 1978", 8000, "img/camiseta1978.jpg");
const camiseta1986 = new Producto(9, "Camiseta Mundial 1986", 10000, "img/camiseta1986.jpg");
const camiseta1990 = new Producto(10, "Camiseta Mundial 1990", 9000, "img/camiseta1990.jpg");
const camiseta2014 = new Producto(11, "Camiseta Mundial 2014", 12000, "img/camiseta2014.jpg");
const camiseta2022 = new Producto(12, "Camiseta Mundial 2022", 20000, "img/camiseta2022.jpg");

const productos = [uruguay, tango, azteca, italia, brazuca, alrihla, camiseta1930, camiseta1978, camiseta1986, camiseta1990, camiseta2014, camiseta2022];
let carrito = [];
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "col-sm-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-tom imgProductos">
                <div class="card-body">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                    <button class="btn colorBoton" id="boton${producto.id}">Agregar al carrito</button>
                </div>
            </div>`
        contenedorProductos.appendChild(card);
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                position: "left",
                gravity: "bottom",
            }).showToast();
        });
    })
}
mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.stock++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push({...producto});
    }
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "col-sm-12");
        card.innerHTML = `
            <div class="card2">
                <img src="${producto.img}" class="card-img-tom2 imgProductos2">
                <div class="card-body2">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                    <p>${producto.stock}</p>
                    <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar</button>
                </div>
            </div>`
        contenedorCarrito.appendChild(card);
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            Toastify({
                text: "Producto eliminado del carrito",
                duration: 3000,
                position: "left",
                gravity: "bottom",
            }).showToast();
        });
    })
    calcularTotal();
};

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
    Toastify({
        text: "Carrito vaciado con exito",
        duration: 3000,
        position: "left",
        gravity: "bottom",
    }).showToast();
});

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    localStorage.clear()
};

const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.stock;
    });
    total.innerHTML = `$${totalCompra}`
}

const imagenLogo = "https://acreditafa.com/mailing/images/logoafa.png";
setTimeout(() => {
    banner.innerHTML = `
        <img class="logotit" src=${imagenLogo} alt="logo" width="70px">
        <h1 class="title">La tienda del <br>campeon del mundo</h1>`
}, 2000);