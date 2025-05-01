import { useEffect, useState } from 'react'
import { Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { toyService } from '../services/toy.service.js'

import '../assets/style/cmps/Dashboard.css'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export function Dashboard() {
  const [labelPriceData, setLabelPriceData] = useState(null)
  const [inStockData, setInStockData] = useState(null)
  const [lineChartData, setLineChartData] = useState(null)

  useEffect(() => {
    toyService.query().then(toys => {
      setLabelPriceData(getPricesPerLabel(toys))
      setInStockData(getInStockByLabel(toys))
      setLineChartData(getRandomLineData())
    })
  }, [])

  if (!labelPriceData || !inStockData || !lineChartData) return <div>Loading dashboard...</div>

  return (
    <section className="dashboard main-layout">
      <h1>Toy Dashboard</h1>

      <div className="charts-container">
        <div className="chart">
          <h3>Prices per Label</h3>
          <Pie data={labelPriceData} />
        </div>

        <div className="chart">
          <h3>Inventory by Label (In Stock)</h3>
          <Pie data={inStockData} />
        </div>

        <div className="chart">
          <h3>Random Activity Over Time</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </section>
  )
}

// === Chart Data Creators ===

function getPricesPerLabel(toys) {
  const labelMap = {}

  toys.forEach(toy => {
    toy.labels.forEach(label => {
      if (!labelMap[label]) labelMap[label] = 0
      labelMap[label] += toy.price
    })
  })

  const labels = Object.keys(labelMap)
  const data = Object.values(labelMap)

  return {
    labels,
    datasets: [
      {
        label: 'Total Price',
        data,
        backgroundColor: getColors(labels.length),
      },
    ],
  }
}

function getInStockByLabel(toys) {
  const labelMap = {}

  toys.forEach(toy => {
    toy.labels.forEach(label => {
      if (!labelMap[label]) labelMap[label] = { total: 0, inStock: 0 }
      labelMap[label].total++
      if (toy.inStock) labelMap[label].inStock++
    })
  })

  const labels = Object.keys(labelMap)
  const data = labels.map(label => {
    const { total, inStock } = labelMap[label]
    return Math.round((inStock / total) * 100)
  })

  return {
    labels,
    datasets: [
      {
        label: '% In Stock',
        data,
        backgroundColor: getColors(labels.length),
      },
    ],
  }
}

function getRandomLineData() {
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toLocaleDateString()
  })

  const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 10)

  return {
    labels,
    datasets: [
      {
        label: 'Weekly Activity',
        data,
        borderColor: '#2a7ae2',
        backgroundColor: '#dbe9ff',
        tension: 0.3,
        fill: true,
      },
    ],
  }
}

function getColors(count) {
  const baseColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#A8B3C5', '#00A36C'
  ]
  return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length])
}