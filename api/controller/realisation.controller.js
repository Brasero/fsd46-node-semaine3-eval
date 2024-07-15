import {
  createRealisationIfNotExists,
  getRealisationsWithMaterialsAndCompanyDetails, updateRealisationQuantity
} from "../Repository/realisations.repository.js";


export async function addRealisation(req,res) {
  const {values} = req.body
  
  if (!values) {
    return res.status(403).send({success: false, message: "Aucune donnée à traiter"})
  }
  const creationResult = await createRealisationIfNotExists(values);
  if (creationResult.created) {
    return res.send({success: true, message: "Nouvelle réalisation ajoutée"})
  }
  res.send({success:false, message: creationResult.reason})
}

export async function getRealisations(req, res) {
  const realisation = await getRealisationsWithMaterialsAndCompanyDetails()
  res.send({realisation})
}

export async function updateRealisationQty(req, res) {
  const {id, qty} = req.body
  if (!id || !qty) {
    return res.status(403).send({modified: false, reason: "Aucune donnée à traiter"})
  }
  const updateResult = await updateRealisationQuantity(id, qty)
  
  if (updateResult.modified) {
    return res.send(updateResult)
  }
  
  res.status(403).send({modified: false})
}