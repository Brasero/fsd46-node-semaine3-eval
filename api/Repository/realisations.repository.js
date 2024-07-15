import Realisations from "../models/realisations.js";
import Materials from "../models/material.js";
import Company from "../models/company.js";

export async function getRealisationsWithMaterialsAndCompanyDetails() {
  const realisations = await Realisations.find({})
    .populate({
      path: "materiaux.material",
      select: "name company",
      populate: [
        {
          path: "company",
          select: "name"
        }
      ]
    })
    .exec();
  const results = realisations.map(realisation => ({
    _id: realisation._id,
    name: realisation.name,
    quantity: realisation.quantity,
    slug: realisation.slug,
    category: realisation.category,
    materiaux: [
      ...realisation.materiaux.map(material => ({
       ...material.material.toJSON(),
       qty: material.qty
      }))
    ]
  }))
  return results;
}

export async function createRealisationIfNotExists(values) {
  try {
    const realisation = new Realisations({
      name: values.name,
      slug: values.name.substring(0, 5),
      category: values.category
    })
    const materailsKey = Object.keys(values.materiaux)
    for (const key of materailsKey) {
      console.log(values.materiaux[key])
      const material = {material: values.materiaux[key].material, qty: values.materiaux[key].qty}
      realisation.materiaux.push(material)
    }
    realisation.quantity = 1
    return realisation.save().then(() => {
      return {created: true}
    })
      .catch(reason => {
        if (reason.errorResponse.code === 11000) {
          return {created: false, reason: `Une réalisation portant la valeur "${reason.errorResponse.keyValue.name}" existe déjà.`}
        }
        return {created: false, reason}
      })
  } catch (reason) {
    console.log(reason)
    return {created: false, reason}
  }
}

export async function updateRealisationQuantity (id, qty) {
  try {
    return Realisations.findByIdAndUpdate(id, {quantity: qty}).exec()
      .then((doc) => {
        return Realisations.findOne({_id: doc._id})
          .populate({
            path: "materiaux.material",
            select: "name company",
            populate: [
              {
                path: "company",
                select: "name"
              }
            ]
          }).exec()
          .then((doc) => {
            const result = {
              _id: doc._id,
              name: doc.name,
              quantity: doc.quantity,
              slug: doc.slug,
              category: doc.category,
              materiaux: [
                ...doc.materiaux.map(material => ({
                  ...material.material.toJSON(),
                  qty: material.qty
                }))
              ]
            }
            return {modified: true, realisation: result}
          })
        
      })
      .catch(reason => {
        console.log(reason)
        return {modified: false, reason}
      })
    
  } catch (reason) {
    console.log(reason)
    return {modified: false, reason}
  }
}