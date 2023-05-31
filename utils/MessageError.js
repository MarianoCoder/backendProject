export const generatorUserError = (user) =>{
    return ` One or more of the following fields are invalid or incomplete:
    List of required fields:
    firstName   : ${user.first_name}
    lastName    : ${user.last_name}
    email       : ${user.email}
    age         : ${user.age}
    `
}

export const generatorProductError = (product) =>{
    return ` One or more of the following fields are invalid or incomplete:
    List of required fields: 
    title       : ${product.title}
    description : ${product.description }
    code        : ${product.code}
    price       : ${product.price}
    stock       : ${product.stock}
    category    : ${product.category}
    `
}