// Domain-themed SVG roadmap visuals. Pure functions -> SVG markup strings.
// progress: 0..1 (techProgress/100). stageIndex: 0..4 derived from progress.
(function () {
  'use strict';

  const W = 280, H = 86;

  function esc(hex) { return hex.replace('#', '%23'); }

  function stageTrack(stageIndex, color) {
    const n = 5;
    const pad = 18;
    const usable = W - pad * 2;
    let dots = '';
    let line = `<line x1="${pad}" y1="${H - 8}" x2="${W - pad}" y2="${H - 8}" stroke="#3a3f52" stroke-width="3"/>`;
    const progressX = pad + (usable * (Math.min(stageIndex, 4) / 4));
    let fillLine = `<line x1="${pad}" y1="${H - 8}" x2="${progressX}" y2="${H - 8}" stroke="${color}" stroke-width="3"/>`;
    for (let i = 0; i < n; i++) {
      const x = pad + (usable * (i / (n - 1)));
      const lit = i <= stageIndex;
      dots += `<circle cx="${x}" cy="${H - 8}" r="${lit ? 6 : 4.5}" fill="${lit ? color : '#20232f'}" stroke="${lit ? color : '#555b73'}" stroke-width="2"/>`;
      if (i === stageIndex) dots += `<circle cx="${x}" cy="${H - 8}" r="10" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.6"><animate attributeName="r" values="8;13;8" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0.1;0.7" dur="2s" repeatCount="indefinite"/></circle>`;
    }
    return line + fillLine + dots;
  }

  // ---- Domain art (top ~60px of the H=86 canvas) ----
  function artAI(progress, color) {
    const layers = [
      [{ x: 30, y: 44 }], [{ x: 80, y: 24 }, { x: 80, y: 44 }, { x: 80, y: 64 }],
      [{ x: 140, y: 16 }, { x: 140, y: 34 }, { x: 140, y: 52 }, { x: 140, y: 70 }],
      [{ x: 200, y: 24 }, { x: 200, y: 44 }, { x: 200, y: 64 }], [{ x: 250, y: 44 }],
    ];
    const litLayers = Math.max(1, Math.ceil(progress * 5));
    let edges = '', nodes = '';
    for (let l = 0; l < layers.length - 1; l++) {
      const on = l < litLayers - 1;
      layers[l].forEach(a => layers[l + 1].forEach(b => {
        edges += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${on ? color : '#31354a'}" stroke-width="${on ? 1.4 : 0.8}" opacity="${on ? 0.65 : 0.35}"/>`;
      }));
    }
    layers.forEach((layer, l) => {
      const on = l < litLayers;
      layer.forEach(n => { nodes += `<circle cx="${n.x}" cy="${n.y}" r="5" fill="${on ? color : '#20232f'}" stroke="${on ? color : '#555b73'}"/>`; });
    });
    return edges + nodes;
  }

  function artSpace(progress, color) {
    const revealY = H - 6 - (progress * 56);
    return `
      <clipPath id="clipRocket"><rect x="0" y="${revealY}" width="${W}" height="${H}"/></clipPath>
      <g transform="translate(140,50)">
        <polygon points="0,-40 12,-8 -12,-8" fill="none" stroke="#555b73" stroke-width="1.5"/>
        <rect x="-10" y="-8" width="20" height="28" fill="none" stroke="#555b73" stroke-width="1.5"/>
        <polygon points="-10,20 -20,32 -10,26" fill="none" stroke="#555b73" stroke-width="1.5"/>
        <polygon points="10,20 20,32 10,26" fill="none" stroke="#555b73" stroke-width="1.5"/>
        <g clip-path="url(#clipRocket)">
          <polygon points="0,-40 12,-8 -12,-8" fill="${color}"/>
          <rect x="-10" y="-8" width="20" height="28" fill="${color}"/>
          <polygon points="-10,20 -20,32 -10,26" fill="${color}"/>
          <polygon points="10,20 20,32 10,26" fill="${color}"/>
        </g>
        ${progress > 0.85 ? `<polygon points="-6,30 0,48 6,30" fill="#ffb347" opacity="0.85"><animate attributeName="points" values="-6,30 0,48 6,30;-4,30 0,40 4,30;-6,30 0,48 6,30" dur="0.4s" repeatCount="indefinite"/></polygon>` : ''}
      </g>`;
  }

  function artSemiconductors(progress, color) {
    const cols = 6, rows = 3;
    const cellW = 30, cellH = 14, x0 = 25, y0 = 14;
    const total = cols * rows;
    const lit = Math.round(progress * total);
    let rects = '', idx = 0, lines = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const on = idx < lit;
        const x = x0 + c * cellW, y = y0 + r * cellH;
        rects += `<rect x="${x}" y="${y}" width="${cellW - 4}" height="${cellH - 4}" fill="${on ? color : 'none'}" opacity="${on ? 0.85 : 1}" stroke="${on ? color : '#3a3f52'}" stroke-width="1"/>`;
        idx++;
      }
    }
    lines = `<rect x="${x0 - 6}" y="${y0 - 6}" width="${cols * cellW + 2}" height="${rows * cellH + 2}" fill="none" stroke="#555b73" stroke-width="1.5"/>`;
    return lines + rects;
  }

  function artEnergy(progress, color) {
    const centers = [[60, 40], [110, 22], [110, 58], [170, 22], [170, 58], [220, 40]];
    const lit = Math.max(1, Math.ceil(progress * centers.length));
    let hexes = '', lines = '';
    for (let i = 0; i < centers.length - 1; i++) {
      lines += `<line x1="${centers[i][0]}" y1="${centers[i][1]}" x2="${centers[i + 1][0]}" y2="${centers[i + 1][1]}" stroke="#3a3f52" stroke-width="1"/>`;
    }
    centers.forEach(([cx, cy], i) => {
      const on = i < lit;
      const pts = [0, 60, 120, 180, 240, 300].map(a => {
        const r = 12, rad = (Math.PI / 180) * a;
        return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
      }).join(' ');
      hexes += `<polygon points="${pts}" fill="${on ? color : '#20232f'}" stroke="${on ? color : '#555b73'}" stroke-width="1.5" opacity="${on ? 0.85 : 1}"/>`;
    });
    return lines + hexes;
  }

  function artClimate(progress, color) {
    const w = W - 40;
    let bars = '';
    const n = 8;
    for (let i = 0; i < n; i++) {
      const x = 20 + (w / n) * i;
      const litFrac = clamp01(progress * n - i);
      const h = 8 + litFrac * 34;
      const grey = '#5b5f6d';
      bars += `<rect x="${x}" y="${58 - h}" width="${w / n - 4}" height="${h}" fill="${litFrac > 0 ? color : grey}" opacity="${0.35 + litFrac * 0.6}"/>`;
    }
    return `<line x1="18" y1="58" x2="${W - 18}" y2="58" stroke="#555b73" stroke-width="1.5"/>${bars}
      <circle cx="${W - 34}" cy="18" r="9" fill="${color}" opacity="${0.3 + progress * 0.6}"/>`;
  }

  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  function artQuantum(progress, color) {
    const cx = 140, cy = 42;
    const ringCount = 4;
    let rings = '';
    for (let i = 1; i <= ringCount; i++) {
      const r = i * 10;
      const on = progress * ringCount >= i - 0.3;
      const jitter = on ? 0 : 3 - progress * 3;
      rings += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${on ? color : '#555b73'}" stroke-width="${on ? 1.6 : 1}"
        stroke-dasharray="${on ? 'none' : '2,' + (1 + jitter)}" opacity="${on ? 0.8 : 0.4}"/>`;
    }
    rings += `<circle cx="${cx}" cy="${cy}" r="4" fill="${color}"/>`;
    return rings;
  }

  function artBiotech(progress, color) {
    const n = 9;
    const x0 = 20, x1 = W - 20;
    let rungs = '', strand = '';
    const lit = Math.round(progress * n);
    for (let i = 0; i < n; i++) {
      const x = x0 + (x1 - x0) * (i / (n - 1));
      const phase = (i / n) * Math.PI * 2;
      const y1 = 20 + Math.sin(phase) * 14 + 20;
      const y2 = 20 - Math.sin(phase) * 14 + 20;
      const on = i < lit;
      rungs += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${on ? color : '#3a3f52'}" stroke-width="${on ? 2 : 1}" opacity="${on ? 0.8 : 0.5}"/>`;
      rungs += `<circle cx="${x}" cy="${y1}" r="2.5" fill="${on ? color : '#555b73'}"/><circle cx="${x}" cy="${y2}" r="2.5" fill="${on ? color : '#555b73'}"/>`;
    }
    let d1 = 'M', d2 = 'M';
    for (let i = 0; i < n; i++) {
      const x = x0 + (x1 - x0) * (i / (n - 1));
      const phase = (i / n) * Math.PI * 2;
      const y1 = 20 + Math.sin(phase) * 14 + 20;
      const y2 = 20 - Math.sin(phase) * 14 + 20;
      d1 += `${x},${y1} `;
      d2 += `${x},${y2} `;
    }
    strand = `<path d="${d1}" fill="none" stroke="#555b73" stroke-width="1.5"/><path d="${d2}" fill="none" stroke="#555b73" stroke-width="1.5"/>`;
    return strand + rungs;
  }

  function artRobotics(progress, color) {
    const parts = [
      { k: 'head', shape: `<circle cx="140" cy="14" r="9"/>` },
      { k: 'torso', shape: `<rect x="124" y="24" width="32" height="28" rx="4"/>` },
      { k: 'arms', shape: `<rect x="104" y="26" width="16" height="8" rx="3"/><rect x="160" y="26" width="16" height="8" rx="3"/>` },
      { k: 'legs', shape: `<rect x="126" y="54" width="10" height="20" rx="3"/><rect x="144" y="54" width="10" height="20" rx="3"/>` },
      { k: 'glow', shape: `<circle cx="140" cy="38" r="26" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>` },
    ];
    const lit = Math.max(1, Math.ceil(progress * parts.length));
    let out = '';
    parts.forEach((p, i) => {
      const on = i < lit;
      out += `<g fill="${on ? color : 'none'}" stroke="${on ? color : '#555b73'}" stroke-width="1.5" opacity="${on ? 0.85 : 1}">${p.shape}</g>`;
    });
    return out;
  }

  function artMaterials(progress, color) {
    const cols = 5, rows = 3;
    const x0 = 40, y0 = 12, dx = 42, dy = 20;
    const total = cols * rows;
    const lit = Math.round(progress * total);
    let dots = '', bonds = '', idx = 0;
    const coords = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = x0 + c * dx + (r % 2 ? dx / 2 : 0);
        const y = y0 + r * dy;
        coords.push([x, y]);
      }
    }
    coords.forEach(([x, y], i) => {
      if (i % cols !== cols - 1 && coords[i + 1]) bonds += `<line x1="${x}" y1="${y}" x2="${coords[i + 1][0]}" y2="${coords[i + 1][1]}" stroke="#3a3f52" stroke-width="1"/>`;
    });
    coords.forEach(([x, y], i) => {
      const on = i < lit;
      dots += `<circle cx="${x}" cy="${y}" r="5" fill="${on ? color : '#20232f'}" stroke="${on ? color : '#555b73'}" stroke-width="1.5" opacity="${on ? 0.9 : 1}"/>`;
    });
    return bonds + dots;
  }

  const ARTISTS = {
    ai: artAI, space: artSpace, semiconductors: artSemiconductors, energy: artEnergy,
    climate: artClimate, quantum: artQuantum, biotech: artBiotech, robotics: artRobotics, materials: artMaterials,
  };

  function render(domainId, progress, color) {
    const p = clamp01(progress);
    const stageIndex = Math.min(4, Math.floor(p * 5));
    const artist = ARTISTS[domainId] || artAI;
    const art = artist(p, color || '#4ec9b0');
    const track = stageTrack(stageIndex, color || '#4ec9b0');
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${art}${track}</svg>`;
  }

  window.Roadmap = { render };
})();
