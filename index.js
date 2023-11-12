import express from 'express'
import hitler from 'adolf-hitler';


const app = express();
const PORT = 8080

let tshirts = [
    {
        "id": "1",
        "logo": "im broken 💔"
    },
    {
        "id": "2",
        "logo": "im gay 🌈"
    },
    {
        "id": "3",
        "logo": "im fire 🔥"
    },
    {
        "id": "4",
        "logo": "i love gdansk 🎡"
    }
]

function filterOutById(array, id) {
    return array.filter(item => item.id !== id);
}

class MyTshirtService {

    delete(tshirtId) {
        tshirts = filterOutById(tshirts, tshirtId)
    }

    save(tshirt) {
        tshirts.push(tshirt);
    }

    getAll() {
        return tshirts;
    }
}

const tshirtService = new MyTshirtService()




////////////////////////////////////////////////////////////////////////

app.use(express.json())

app.get('/hello', (req, res) => {
    res.status(200).send({ text: "you are gay" })
});

app.get('/yoo', (req, res) => {
    res.status(200).send({ text: hitler() })
});

app.get('/tshirts', (req, res) => {
    res.status(200).send(tshirtService.getAll())
});

app.delete('/tshirts/:id', (req, res) => {
    const { id } = req.params;

    tshirtService.delete(id);

    res.status(204).send({ text: `deleted tshirt with id: ${id}` })
});


app.post('/tshirts/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body

    if (!logo) {
        res.status(418).send({ message: 'We need a logo!' })
    }

    tshirtService.save({
        id, logo
    })

    res.send({
        tshirt: `🥋 with your ${logo} and ID of ${id}`
    })
})



app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)