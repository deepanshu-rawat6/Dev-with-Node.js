import prisma from "../configs/db"

// GET all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({
        data: user.products
    })
}

// GET a single product
export const getProduct = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.params.id,
            belongsToID: req.user.id
        }
    })

    res.json({
        data: product
    })
}

// POST a new product
export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToID: req.user.id
        }
    })

    res.json({
        data: product
    })
}

// PUT updated data in an existing product
export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToID: {
                id: req.params.id,
                belongsToID: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({
        data: updated
    })
}

// DELETE an existing product
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToID: {
                id: req.params.id,
                belongsToID: req.user.id
            }
        }
    })

    res.json({
        data: deleted
    })
}