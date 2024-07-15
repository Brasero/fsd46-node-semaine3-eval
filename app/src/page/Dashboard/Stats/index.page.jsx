// path : app/src/page/Dashboard/Stats/index.page.jsx
import "./style.scss";
import {useSelector} from "react-redux";
import {selectRealisations} from "../../../store/selector/realisation.selector.js";
import {AgCharts} from "ag-charts-react";
import {selectMaterials} from "../../../store/selector/material.selector.js";
import {formatWeight} from "../../../utils/utils.js";

const StatsPage = () => {
    const realisations = useSelector(selectRealisations)
    const materials = useSelector(selectMaterials)
    const data = realisations.reduce((acc, curr) => {
        const real = {
            name: curr.name
        }
        curr.materiaux.forEach(material => {
            real[material.name] = material.qty
            acc.push(real)
        })
        return acc
    }, [])
    console.log(data)
    
    const series = [...materials.reduce((acc, curr) => {
        const serie = {
            type: "bar",
            xKey: "name",
            yKey: curr.name,
            yName: curr.name,
            stacked: true,
            tooltip: {
                renderer: function({ datum, xKey, yKey }) {
                    console.log("datum : ", datum)
                    return {
                        content: `${yKey} : ${formatWeight(datum[yKey])}`,
                        title: datum[xKey]
                    }
                }
            }
        }
        acc.push(serie)
        return acc
    }, [])]
    
    const chartOptions = {
        title: {
            text: "Répartition des matériaux par réalisation"
        },
        subtitle: {
            text: "En grammes"
        },
        data: data,
        series: series
    }
  
  return <div className="page" id="Stats">
    <div className="container">
        <h1>Statistiques</h1>
        <div className="chartContainer">
            <AgCharts options={chartOptions} />
        </div>
    </div>
  </div>
}

export default StatsPage