import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();


app.use(express.json());

app.post('/usuarios', async (req,res) =>{

    await prisma.user.create({             //fala pro codigo aguardar
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)  // Indica que criou o que foi pedido (req 200)
})

app.get('/usuarios/', async (req, res) =>{
    const users = await prisma.user.findMany()
    res.status(200).json(users) //Envia o usuario criado (req 200)
})

app.put('/usuarios/:id', async (req,res) =>{
    console.log(req)
      await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age 
        }
    })
})

app.delete('/usuarios/:id', async (req,res) =>{
   await prisma.user.delete({
    where: {
        id: req.params.id,
    },
   })

    res.status(200).json({message: 'Usuario deletado com sucesso!'})
} )

app.listen(3000) //porta para rodar o servidor com a porta


/* 
banco de dados 
login> vitorstrtic
senha> wN1vuUITWC95zRwm
*/