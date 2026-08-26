const comunasPorRegion = {
  rm: ["Santiago", "Providencia", "Maipú"],
  araucania: ["Temuco", "Villarrica"],
  nuble: ["Chillán", "San Carlos"],
};

const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

selectRegion.addEventListener("change", () => {
  const comunas = comunasPorRegion[selectRegion.value] || [];
  selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
  selectComuna.disabled = comunas.length === 0;
  comunas.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.toLowerCase();
    opt.textContent = c;
    selectComuna.appendChild(opt);
  });
});
