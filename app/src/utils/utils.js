//Si la valeur de weight est inférieur à 1000 on retourne sa valeur suivie de "g",
//sinon on retourne la valeur en "kg" arrondi à la seconde décimale
export function formatWeight(weight) {
  return weight >= 1000 ?
    `${Math.floor(weight / 10) / 100} kg`
    :
    `${weight} g`
}