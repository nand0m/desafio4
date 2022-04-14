const express = require('express');
const { Router } = express;

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api', router);

const server = app.listen(8080, () => {
    console.log('La aplicacion express esta escuchando en el puerto 8080')
})

app.get('/', function (req, res) {
    res.sendFile((__dirname + '/public/index.html'));
})




// GET Devuelve todos los productos

router.get('/productos', (req, resp) => {
    resp.json(productos.getAll());
})





// GET Devuelve por ID

/*
router.get('/productos/:id', (req, resp) => {
    let identificador = req.params.id;
    resp.json(productos.getById(identificador));
})
*/

router.get('/productos/:id', (req, resp) => {
    let seleccion = productos.getById(req.params.id)
    resp.json({
        result: 'get by id',
        producto: seleccion,
        id: req.params.id, 
        error: 'producto no encontrado'
    });
})








// POST Recibe y agrega un prod y lo devuelve con su ID asignado.
router.post('/productos', (req, resp) => {

    resp.json({
        result: 'Save product',
        body: req.body
    });
})



// PUT Recibe y actualiza un prod segun su id.
router.put('/productos/:id', (req, resp) => {
 
    resp.json({
        result: 'edit by id',
        id: req.params.id, 
        body: req.body
    });
})



// DELETE Eminima un producto segun su id.
router.delete('/productos/:id', (req, resp) => {
 
    resp.json({
        result: 'edit by id',
        id: req.params.id
    });
})






const fs = require('fs');

class Contenedor {

    constructor (path, name, price, id, thumbnail) {
        this.name = name;
        this.price = price;
        this.id = 1;
        this.thumbnail = thumbnail;
        this.route=path
    }

    save(Object) {
        Object.id = this.id++;
        let temp = [];

        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }

        temp.push(Object);
        fs.writeFileSync(this.route, JSON.stringify(temp));
        return Object.id;
    }

    getById(Number) {
        let temp = [];
        let prod_id = Number;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        let sel = temp.filter(elegido => {
            return elegido.id === prod_id;
        })
        return sel;
    }

    getAll() {
        let temp = [];
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        return temp;
    }

    deleteById(Number) {
        let temp = [];
        let prod_id = Number;
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        let sel = temp.filter(elegido => {
            return elegido.id != prod_id;
        })
        fs.writeFileSync(this.route, JSON.stringify(sel));
    }


    deleteAll() {
        let temp = [];
        let erase = [];
        try {
            let data = fs.readFileSync(this.route, 'utf-8');
            temp = JSON.parse(data);
        } catch (err) {
        }
        fs.writeFileSync(this.route, JSON.stringify(erase));
    }

}

let productos = new Contenedor('./productos.json');
