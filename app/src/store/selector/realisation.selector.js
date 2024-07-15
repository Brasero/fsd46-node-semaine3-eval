export const selectRealisations = state => state.realisations.items

export const selectFilteredRealisation = state => {
  let filteredRealisations = [];
  if (state.realisations.filters.materials.length) {
    filteredRealisations = state.realisations.items.filter(item => item.materiaux.some(material => state.realisations.filters.materials.includes(material.name)))
  } else {
    filteredRealisations = state.realisations.items
  }
  if (state.realisations.filters.categories.length) {
    if (filteredRealisations.length) {
      filteredRealisations = filteredRealisations.filter(realisation => state.realisations.filters.categories.includes(realisation.category))
    } else {
      filteredRealisations = state.realisations.items.filter(item => state.realisations.filters.categories.includes(item.category))
    }
  }
  return filteredRealisations
}
export const isSelectedFilter = filter => state => state.realisations.filters[filter.filter].includes(filter.value)

export const isLoadingRealisation = state => state.realisations.loadingState === "pending"

export const selectRealisationBySlug = slug => state => state.realisations.items.filter(item => item.slug === slug)[0]