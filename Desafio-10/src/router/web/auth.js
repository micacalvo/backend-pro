import { Router } from 'express';

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre !== nombre) {
        return res.send('Login Failed')
    }
    req.session.nombre = nombre;
    res.send('Login success')
})

function auth(req, res, next) {
    if (req.session?.user === nombre && req.session?.admin) {
        return next()
    }
    return res.status(401).send('Error de autenticacion')
}


authWebRouter.get('/private', auth, (req, res) => {
    res.send('Si estas viendo esta pagina estas logueado y sos Admin')
})

authWebRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            res.send('Logout ok')
        }
    })
})

export default authWebRouter