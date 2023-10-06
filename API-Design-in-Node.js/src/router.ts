import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { handleInputErrors } from './modules/middlewares';
import { createProduct, deleteProduct, getProduct, getProducts } from './handlers/products';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

/**
 * Products
 */

router.get('/product', getProducts)

router.get('/product/:id', getProduct)

router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => { })

router.post('/product', body('name').isString(), handleInputErrors, createProduct)

router.delete('/product/:id', deleteProduct)

/**
 * Update
 */

router.get('/update', getUpdates)

router.get('/update/:id', getOneUpdate)

router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('version').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('asset').optional(),
    updateUpdate
)

router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
)

router.delete('/update/:id', deleteUpdate)

/**
 * Upate Points
 */

router.get('/updatepoint', () => { })

router.get('/updatepoint/:id', () => { })

router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { }
)

router.post('/updatepoint',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    () => { })

router.delete('/updatepoint/:id', () => { })


router.use((err, req, res, next) => {
    console.log(err)
})


export default router;