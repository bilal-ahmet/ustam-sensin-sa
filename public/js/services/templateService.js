const templateCache = new Map();

export async function loadTemplate(name) {
  if (templateCache.has(name)) return templateCache.get(name);
  const response = await fetch(`/templates/${name}.ejs`);
  const text = await response.text();
  templateCache.set(name, text);
  return text;
}

export async function renderTemplate(name, data) {
  const tpl = await loadTemplate(name);
  return window.ejs.render(tpl, data);
}


