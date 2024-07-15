export const selectMaterials = state => state.materials.items

export const selectMaterialByName = name => state => state.materials.items.filter(item => item.name === name)[0]