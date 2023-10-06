import prisma from "../configs/db"

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToID: req.user.id
        },
        include: {
            updates: true
        }
    })

    // This is not a good practice, instead update the schemas, join the tables and return the data
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json({
        data: updates
    })
}

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id,
        }
    })

    res.json({
        data: update
    })
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        return res.status(404).json({
            message: "nope"
        })
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {
                connect: {
                    id: product.id
                }
            }
        }
    })

    res.json({
        data: update
    })
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            id: req.body.id
        },
        include: {
            updates: true
        }
    })

    // This is not a good practice, instead update the schemas, join the tables and return the data
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.status(404).json({
            message: "nope"
        })
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({
        data: updatedUpdate
    })
}

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            id: req.body.id
        },
        include: {
            updates: true
        }
    })

    // This is not a good practice, instead update the schemas, join the tables and return the data
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.status(404).json({
            message: "nope"
        })
    }

    const updateDeleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({
        data: updateDeleted
    })
}
