import Material from "./models/material.js";
import Company from "./models/company.js";
import {materials} from "./initialData/materiaux.js";
import {companies} from "./initialData/company.js";

async function insertCompanies() {
  console.group(">> Inserting companies")
  await Company.deleteMany({})
  for (const c of companies) {
    const company = new Company({
      name: c.name
    })
    await company.save()
    console.log(`${c.name} inserted`)
  }
  console.log(">> All companies inserted")
  console.groupEnd()
}

async function insertMaterials() {
  console.group(">> Inserting materials")
  await Material.deleteMany({})
  for (const m of materials) {
    const company = await Company.findOne({name: m.company.name}, {_id: 1}, {})
    const material = new Material({
      name: m.name,
      description: m.description,
      company: company._id
    })
    await material.save()
    console.log(`Material ${m.name} inserted`)
  }
  console.log(">> All materials inserted")
  console.groupEnd()
}

await insertCompanies();
await insertMaterials();
process.exit(0);