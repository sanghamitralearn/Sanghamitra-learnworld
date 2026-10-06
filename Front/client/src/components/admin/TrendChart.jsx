import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

// Prints each point's value above it — only used for single-line charts, where it stays readable.
const pointLabels = {
  id: 'pointLabels',
  afterDatasetsDraw(chart, _args, opts) {
    if (!opts.enabled) return;
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      chart.getDatasetMeta(i).data.forEach((point, idx) => {
        const value = dataset.data[idx];
        if (value === null || value === undefined) return;
        ctx.save();
        ctx.fillStyle = dataset.borderColor;
        ctx.font = '600 13px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value, point.x, point.y - 14);
        ctx.restore();
      });
    });
  }
};

// datasets: [{ label, data, color }]; values are percentages (0-100).
export default function TrendChart({ labels, datasets, height = 280 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const single = datasets.length === 1;
    const chart = new Chart(canvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map((d) => ({
          label: d.label,
          data: d.data,
          borderColor: d.color,
          backgroundColor: d.color,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          tension: 0.15,
          spanGaps: true
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 24, right: 12 } },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, color: '#94a3b8', callback: (v) => `${v}%` },
            grid: { color: '#eef1f6' },
            border: { display: false }
          },
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
        },
        plugins: {
          legend: { display: !single, position: 'top', align: 'end', labels: { boxWidth: 10, usePointStyle: true } },
          tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.y}%` } },
          pointLabels: { enabled: single }
        }
      },
      plugins: [pointLabels]
    });
    return () => chart.destroy();
  }, [labels, datasets]);

  return (
    <div style={{ position: 'relative', height }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
