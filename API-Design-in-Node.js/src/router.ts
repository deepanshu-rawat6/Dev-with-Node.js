import { Router } from 'express';

const router = Router();

/**
 * Products
 */

router.get('/product', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

router.get('/product/:id', () => { })

router.put('/product/:id', () => { })

router.post('/product', () => { })

router.delete('/product/:id', () => { })

/**
 * Update
 */

router.get('/udapte', () => { })

router.get('/udapte/:id', () => { })

router.put('/udapte/:id', () => { })

router.post('/udapte', () => { })

router.delete('/udapte/:id', () => { })

/**
 * Upate Points
 */

router.get('/udaptepoint', () => { })

router.get('/udaptepoint/:id', () => { })

router.put('/udaptepoint/:id', () => { })

router.post('/udaptepoint', () => { })

router.delete('/udaptepoint/:id', () => { })


export default router;